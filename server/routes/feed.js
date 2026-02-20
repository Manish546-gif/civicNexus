import express from 'express';
const router = express.Router();
import Feed from '../models/Feed.js';
import { protect } from '../middleware/authMiddleware.js';

// Get all feed posts
router.get('/', async (req, res) => {
    try {
        const feeds = await Feed.find()
            .populate('author', 'name role xp')
            .populate('replies.author', 'name')
            .sort({ timestamp: -1 });
        res.json(feeds);
    } catch (err) {
        res.status(500).json({ message: 'Server error fetching feed' });
    }
});

// Create a new post
router.post('/', protect, async (req, res) => {
    const { content, topic, image, tags } = req.body;
    try {
        // Simple hashtag extraction if tags aren't provided
        const extractedTags = tags || (content.match(/#\w+/g) || []).map(t => t.substring(1));

        const newPost = await Feed.create({
            author: req.user.id,
            content,
            topic,
            image,
            tags: extractedTags
        });

        const populatedPost = await newPost.populate('author', 'name role xp');

        // Civic engagement XP reward (+25 XP)
        const User = (await import('../models/User.js')).default;
        await User.findByIdAndUpdate(req.user.id, {
            $inc: { xp: 25 },
            $push: {
                activityHistory: {
                    description: `Broadcasted a signal to the Community Pulse: ${topic}`,
                    timestamp: new Date()
                }
            }
        });

        res.status(201).json(populatedPost);
    } catch (err) {
        res.status(500).json({ message: 'Server error creating post' });
    }
});

// Toggle Like
router.post('/:id/like', protect, async (req, res) => {
    try {
        const post = await Feed.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const index = post.likes.indexOf(req.user.id);
        if (index === -1) {
            post.likes.push(req.user.id);
        } else {
            post.likes.splice(index, 1);
        }

        await post.save();
        res.json({ likes: post.likes });
    } catch (err) {
        res.status(500).json({ message: 'Server error liking post' });
    }
});

// Add Reply
router.post('/:id/reply', protect, async (req, res) => {
    const { content } = req.body;
    try {
        const post = await Feed.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const reply = {
            author: req.user.id,
            content
        };

        post.replies.push(reply);
        await post.save();

        const populatedPost = await Feed.findById(req.params.id)
            .populate('author', 'name role xp')
            .populate('replies.author', 'name');

        res.json(populatedPost);
    } catch (err) {
        res.status(500).json({ message: 'Server error replying to post' });
    }
});

export default router;
