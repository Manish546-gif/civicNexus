import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Chemistry', 'Geography', 'Science', 'Word Mastery', 'Algorithm/DSA', 'Mixed']
    },
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: Number, required: true }, // Index of the correct option
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' }
});

export default mongoose.model('Question', questionSchema);
