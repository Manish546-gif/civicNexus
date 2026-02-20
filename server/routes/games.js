import express from 'express';
const router = express.Router();
import Question from '../models/Question.js';
import User from '../models/User.js';
import Lobby from '../models/Lobby.js';
import { protect } from '../middleware/authMiddleware.js';

// Get random questions by category
router.get('/questions', async (req, res) => {
    const { category, limit = 10 } = req.query;
    try {
        let query = {};
        if (category && category !== 'Mixed') {
            query.category = category;
        }

        // Use MongoDB aggregation to get random samples
        const questions = await Question.aggregate([
            { $match: query },
            { $sample: { size: parseInt(limit) } }
        ]);

        res.json(questions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching questions' });
    }
});

// Complete game and award XP
router.post('/complete', protect, async (req, res) => {
    const { xpEarned } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.xp += xpEarned;
        await user.save();

        res.json({
            message: `Success! You earned ${xpEarned} XP.`,
            newXp: user.xp
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error saving XP' });
    }
});

// Lobby management
router.get('/lobbies', async (req, res) => {
    try {
        const lobbies = await Lobby.find().sort({ createdAt: -1 });
        const roomUsers = req.app.get('roomUsers') || {};

        const lobbiesWithStats = lobbies.map(lobby => {
            const activeUsersInRoom = roomUsers[lobby.code] || [];
            return {
                ...lobby.toObject(),
                currentPlayers: activeUsersInRoom.length
            };
        });

        res.json(lobbiesWithStats);
    } catch (err) {
        res.status(500).json({ message: 'Server error fetching lobbies' });
    }
});

router.post('/lobbies', protect, async (req, res) => {
    const { name, category, private: isPrivate, maxPlayers } = req.body;
    try {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        const lobby = await Lobby.create({
            name,
            host: req.user.name,
            hostId: req.user.id,
            category,
            private: isPrivate,
            maxPlayers: maxPlayers || 6,
            code,
            status: 'Waiting'
        });
        res.status(201).json(lobby);
    } catch (err) {
        res.status(500).json({ message: 'Server error creating lobby' });
    }
});

export default router;
