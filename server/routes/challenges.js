import express from 'express';
const router = express.Router();
import Challenge from '../models/Challenge.js';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

// Get active challenges
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find({ isActive: true });
        res.json(challenges);
    } catch (err) {
        res.status(500).json({ message: 'Server error fetching challenges' });
    }
});

// Complete a challenge (simplified logic for now)
router.post('/:id/complete', protect, async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

        const user = await User.findById(req.user.id);
        user.xp += challenge.rewardXp;
        await user.save();

        res.json({ message: `Challenge completed! Received ${challenge.rewardXp} XP.`, newXp: user.xp });
    } catch (err) {
        res.status(500).json({ message: 'Server error completing challenge' });
    }
});

export default router;
