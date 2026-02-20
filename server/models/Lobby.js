import mongoose from 'mongoose';

const lobbySchema = new mongoose.Schema({
    name: { type: String, required: true },
    host: { type: String, required: true },
    players: { type: String, default: '1/6' },
    mode: { type: String, default: 'Competitive' },
    category: { type: String, required: true },
    status: { type: String, default: 'Waiting', enum: ['Waiting', 'Full', 'In Progress'] },
    code: { type: String, required: true, unique: true },
    private: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Lobby', lobbySchema);
