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
import chatRoutes from './routes/chat.js';
import Message from './models/Message.js';

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/chat', chatRoutes);

// System Presence Tracking
let activeUsers = new Set();
let roomUsers = {}; // roomId -> Array of { socketId, user }

app.get('/api/admin/system-stats', (req, res) => {
    res.json({
        liveUsers: activeUsers.size,
        uptime: process.uptime(),
        memory: process.memoryUsage().heapUsed
    });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/community_platform')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Socket.io Real-time Logic
io.on('connection', (socket) => {
    activeUsers.add(socket.id);
    console.log('A user connected:', socket.id, '| Live:', activeUsers.size);
    io.emit('stats_update', { liveUsers: activeUsers.size });

    socket.on('join_room', (data) => {
        const { roomId, user } = typeof data === 'string' ? { roomId: data, user: null } : data;
        socket.join(roomId);
        console.log(`[SOCKET] User ${socket.id} joined room: ${roomId}`);

        if (user) {
            if (!roomUsers[roomId]) roomUsers[roomId] = [];
            // Remove any stale entry for same socket
            roomUsers[roomId] = roomUsers[roomId].filter(u => u.socketId !== socket.id);
            roomUsers[roomId].push({ socketId: socket.id, ...user });
            io.to(roomId).emit('room_users_update', roomUsers[roomId]);
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

    socket.on('disconnect', () => {
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
