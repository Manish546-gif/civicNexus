import express from 'express';
const router = express.Router();
import Message from '../models/Message.js';
import { protect } from '../middleware/authMiddleware.js';

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
