import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const feedSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    topic: {
        type: String,
        enum: ['Environment', 'Civic Issues', 'Education', 'General'],
        default: 'General'
    },
    tags: [{ type: String }],
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [replySchema],
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Feed', feedSchema);
