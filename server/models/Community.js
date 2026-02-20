import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    emoji: { type: String, default: '👥' },
    category: { type: String, required: true },
    description: { type: String },
    membersCount: { type: Number, default: 0 },
    activityLevel: { type: String, default: 'Low' },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Community', communitySchema);
