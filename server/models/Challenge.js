import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    xp: { type: Number, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Challenge', challengeSchema);
