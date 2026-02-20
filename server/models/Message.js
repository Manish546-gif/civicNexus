import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    roomId: { type: String, required: true, index: true },
    sender: { type: String, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
