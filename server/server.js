import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { origin: '*' });

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// System Stats Cache
let activeUsers = new Set();

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

    socket.on('disconnect', () => {
        activeUsers.delete(socket.id);
        console.log('User disconnected:', socket.id, '| Live:', activeUsers.size);
        io.emit('stats_update', { liveUsers: activeUsers.size });
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
