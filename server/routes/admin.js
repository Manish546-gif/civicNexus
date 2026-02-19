import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import Challenge from '../models/Challenge.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Apply protection to all admin routes
router.use(protect);
router.use(admin);

// User Management
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/users/:id/block', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.isBlocked = !user.isBlocked;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Challenge Management
router.post('/challenges', async (req, res) => {
    try {
        const challenge = await Challenge.create(req.body);
        res.json(challenge);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
