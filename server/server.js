import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';

// Fix for querySrv ECONNREFUSED on Windows
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import gameRoutes from './routes/games.js';
import challengeRoutes from './routes/challenges.js';
import feedRoutes from './routes/feed.js';
import chatRoutes from './routes/chat.js';
import Message from './models/Message.js';
import User from './models/User.js';
import Community from './models/Community.js';
import Lobby from './models/Lobby.js';

app.use(cors({
    origin: 'https://civicnexus.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/feeds', feedRoutes);
app.use('/api/chat', chatRoutes);

// System Presence Tracking
let activeUsers = new Set();
let roomUsers = {}; // roomId -> Array of { socketId, user }
let onlineUsers = new Map(); // socket.id -> userId

app.set('roomUsers', roomUsers);

app.get('/api/admin/system-stats', async (req, res) => {
    try {
        const [totalUsers, totalCommunities, totalLobbies, totalXp] = await Promise.all([
            User.countDocuments(),
            Community.countDocuments(),
            Lobby.countDocuments(),
            User.aggregate([{ $group: { _id: null, total: { $sum: "$xp" } } }])
        ]);

        res.json({
            liveUsers: activeUsers.size,
            totalUsers,
            totalCommunities,
            totalLobbies,
            totalXp: totalXp[0]?.total || 0,
            uptime: process.uptime(),
            memory: process.memoryUsage().heapUsed
        });
    } catch (err) {
        res.status(500).json({ error: 'Stats collection failed' });
    }
});

app.get('/api/admin/active-overview', async (req, res) => {
    try {
        const [communities, lobbies] = await Promise.all([
            Community.find(),
            Lobby.find()
        ]);

        const activeOverview = {
            communities: communities.map(c => ({
                ...c.toObject(),
                activeUsers: roomUsers[c.name] || []
            })),
            lobbies: lobbies.map(l => ({
                ...l.toObject(),
                activeUsers: roomUsers[l.code] || []
            }))
        };
        res.json(activeOverview);
    } catch (err) {
        res.status(500).json({ error: 'Overview collection failed' });
    }
});

app.get('/api/admin/live-activity', (req, res) => {
    const activity = [];
    Object.keys(roomUsers).forEach(roomId => {
        roomUsers[roomId].forEach(u => {
            activity.push({
                user: u.name || u.email || 'Anonymous',
                room: roomId,
                socketId: u.socketId,
                timestamp: new Date()
            });
        });
    });
    res.json(activity);
});

// Default Admin Seeding
const initializeAdmin = async () => {
    try {
        const defaultEmail = 'admin@hub.com'.toLowerCase();
        const adminExists = await User.findOne({ email: defaultEmail });

        if (!adminExists) {
            console.log('[SEED] No admin found. Creating default admin...');
            await User.create({
                name: 'System Admin',
                email: 'admin@hub.com'.toLowerCase(),
                password: 'admin123',
                role: 'admin',
                xp: 1000
            });
            console.log('[SEED] Default admin created: admin@hub.com / admin123');
        } else {
            console.log('[SEED] Admin system already initialized.');
        }
    } catch (err) {
        console.error('[SEED] Error initializing admin:', err);
    }
};

const initializeCommunities = async () => {
    try {
        const count = await Community.countDocuments();
        if (count === 0) {
            console.log('[SEED] Seeding initial communities...');
            await Community.create([
                { emoji: '🎓', name: 'EduTech Alliance', category: 'Education', membersCount: 1240, activityLevel: 'High', description: 'A collaborative space for educators and students to innovate in digital learning.', tags: ['AI', 'E-Learning', 'EdTech'] },
                { emoji: '🌱', name: 'Climate Hackers', category: 'Environmental', membersCount: 890, activityLevel: 'High', description: 'Building tech solutions to fight climate change and promote sustainability.', tags: ['Sustainability', 'GreenTech', 'Climate'] },
                { emoji: '🏛️', name: 'Civic Leaders Hub', category: 'Civic', membersCount: 640, activityLevel: 'Med', description: 'Organizing civic action, policy discussions, and community governance initiatives.', tags: ['Policy', 'Governance', 'Democracy'] },
                { emoji: '💻', name: 'CodeCraft Pro', category: 'Education', membersCount: 2100, activityLevel: 'High', description: 'Expert-level competitive programming and algorithm challenges community.', tags: ['DSA', 'Competitive', 'Coding'] }
            ]);
            console.log('[SEED] Communities seeded successfully.');
        }
    } catch (err) {
        console.error('[SEED] Community seeding failed:', err);
    }
};

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/community_platform')
    .then(() => {
        console.log('Connected to MongoDB');
        initializeAdmin();
        initializeCommunities();
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Socket.io Real-time Logic
io.on('connection', (socket) => {
    activeUsers.add(socket.id);
    console.log('A user connected:', socket.id, '| Live:', activeUsers.size);
    io.emit('stats_update', { liveUsers: activeUsers.size });

    socket.on('join_room', async (data) => {
        const { roomId, user } = typeof data === 'string' ? { roomId: data, user: null } : data;
        socket.join(roomId);
        console.log(`[SOCKET] User ${socket.id} joined room: ${roomId}`);

        if (user) {
            // Track online status
            onlineUsers.set(socket.id, user.id);

            if (!roomUsers[roomId]) roomUsers[roomId] = [];
            roomUsers[roomId] = roomUsers[roomId].filter(u => u.socketId !== socket.id);
            roomUsers[roomId].push({ socketId: socket.id, ...user });
            io.to(roomId).emit('room_users_update', roomUsers[roomId]);

            // Persist activity to DB
            try {
                const activityStr = `Joined ${roomId}`;
                await User.findByIdAndUpdate(user.id, {
                    currentActivity: activityStr,
                    $push: {
                        activityHistory: {
                            $each: [{ description: activityStr, timestamp: new Date() }],
                            $slice: -20 // Keep last 20 activities
                        }
                    }
                });
                io.emit('user_status_change', { userId: user.id, status: 'online', activity: activityStr });
            } catch (err) {
                console.error('[SOCKET] Failed to update user activity:', err);
            }
        }
    });

    socket.on('send_message', async (data) => {
        console.log(`[SOCKET] Message in ${data.roomId} from ${data.user}:`, data.message);

        try {
            // Persist to Database
            const savedMsg = await Message.create({
                roomId: data.roomId,
                sender: data.user,
                text: data.message,
                timestamp: new Date()
            });

            // Broadcast to Room
            io.to(data.roomId).emit('receive_message', {
                roomId: data.roomId,
                text: savedMsg.text,
                user: savedMsg.sender,
                timestamp: savedMsg.timestamp
            });

            // Global Notification for Unread Badges
            io.emit('new_message_notification', {
                roomId: data.roomId,
                sender: savedMsg.sender
            });
        } catch (err) {
            console.error('[SOCKET] Error saving message:', err);
        }
    });

    socket.on('disconnect', async () => {
        const userId = onlineUsers.get(socket.id);
        if (userId) {
            try {
                await User.findByIdAndUpdate(userId, { currentActivity: 'Offline' });
                io.emit('user_status_change', { userId, status: 'offline', activity: 'Offline' });
            } catch (err) {
                console.error('[SOCKET] Failed to clear user status:', err);
            }
            onlineUsers.delete(socket.id);
        }

        activeUsers.delete(socket.id);

        // Clean up room presence
        Object.keys(roomUsers).forEach(roomId => {
            const initialCount = roomUsers[roomId].length;
            roomUsers[roomId] = roomUsers[roomId].filter(u => u.socketId !== socket.id);
            if (roomUsers[roomId].length !== initialCount) {
                io.to(roomId).emit('room_users_update', roomUsers[roomId]);
            }
        });

        console.log('User disconnected:', socket.id, '| Live:', activeUsers.size);
        io.emit('stats_update', { liveUsers: activeUsers.size });
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
