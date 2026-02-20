import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    badges: [{ type: String }],
    isBlocked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

userSchema.virtual('level').get(function () {
    return Math.floor(this.xp / 500) + 1;
});

userSchema.virtual('rankName').get(function () {
    const level = Math.floor(this.xp / 500) + 1;
    if (level < 10) return 'Novice';
    if (level < 30) return 'Apprentice';
    return 'Master';
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model('User', userSchema);
