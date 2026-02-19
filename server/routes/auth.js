import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
    const { tokenId } = req.body;
    console.log('Google Auth Request Received');

    if (!process.env.GOOGLE_CLIENT_ID) {
        console.error('GOOGLE_CLIENT_ID is not defined in environment variables');
        return res.status(500).json({ message: 'Server configuration error: GOOGLE_CLIENT_ID missing' });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const { name, email, picture } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            // Create user for first-time Google sign-up
            // We set a random password because it's required by the schema, 
            // but the user will login via Google
            const randomPassword = Math.random().toString(36).slice(-16);
            user = await User.create({
                name,
                email,
                avatar: picture,
                password: randomPassword,
                role: 'user'
            });
        }

        if (user.isBlocked) return res.status(403).json({ message: 'Account blocked' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, role: user.role, xp: user.xp } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Google authentication failed' });
    }
});

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user'
        });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role, xp: user.xp } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });
        if (user.isBlocked) return res.status(403).json({ message: 'Account blocked' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, role: user.role, xp: user.xp } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

router.get('/profile', async (req, res) => {
    const { id } = req.query;
    try {
        const user = await User.findById(id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
