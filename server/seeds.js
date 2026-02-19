import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

const users = [
    { name: 'User One', email: 'user1@example.com', password: 'password123', role: 'user', xp: 0, streak: 0 },
    { name: 'User Two', email: 'user2@example.com', password: 'password123', role: 'user', xp: 0, streak: 0 },
    { name: 'User Three', email: 'user3@example.com', password: 'password123', role: 'user', xp: 0, streak: 0 },
    { name: 'User Four', email: 'user4@example.com', password: 'password123', role: 'user', xp: 0, streak: 0 },
    { name: 'Admin User', email: 'admin@example.com', password: 'adminpassword', role: 'admin', xp: 0, streak: 0 },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/community_platform');
        console.log('Connected to MongoDB for seeding...');

        await User.deleteMany({});
        console.log('Cleared existing users.');

        await User.create(users);
        console.log('Seeded 4 users and 1 admin.');

        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
