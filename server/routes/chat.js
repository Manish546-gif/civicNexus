import express from 'express';
const router = express.Router();
import Message from '../models/Message.js';
import Community from '../models/Community.js';
import { protect } from '../middleware/authMiddleware.js';

// Get all communities
router.get('/communities', async (req, res) => {
    try {
        const communities = await Community.find();
        res.json(communities);
    } catch (err) {
        res.status(500).json({ message: 'Server error fetching communities' });
    }
});

// Get chat history for a specific room
router.get('/history/:roomId', protect, async (req, res) => {
    try {
        const messages = await Message.find({ roomId: req.params.roomId })
            .sort({ timestamp: 1 })
            .limit(100);
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Server error fetching chat history' });
    }
});

export default router;
