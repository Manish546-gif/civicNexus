import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['XP', 'Games', 'Category'], required: true },
    target: { type: Number, required: true }, // e.g., 500 XP or 3 games
    rewardXp: { type: Number, required: true },
    category: { type: String }, // Optional, for category-specific challenges
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date }
});

export default mongoose.model('Challenge', challengeSchema);
