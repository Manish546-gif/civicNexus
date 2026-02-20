import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Challenge from '../models/Challenge.js';

dotenv.config();

const challenges = [
    {
        title: 'Algorithm Pioneer',
        description: 'Complete 3 Algorithm/DSA games.',
        type: 'Games',
        target: 3,
        rewardXp: 200,
        category: 'Algorithm/DSA'
    },
    {
        title: 'XP Grind',
        description: 'Earn 1000 XP in a single day.',
        type: 'XP',
        target: 1000,
        rewardXp: 500
    },
    {
        title: 'Geography Specialist',
        description: 'Achieve a perfect score in a Geography match.',
        type: 'Category',
        target: 1,
        rewardXp: 150,
        category: 'Geography'
    },
    {
        title: 'Science Whisperer',
        description: 'Participate in 5 Science Lab sessions.',
        type: 'Games',
        target: 5,
        rewardXp: 300,
        category: 'Science'
    },
    {
        title: 'Word Smith',
        description: 'Reach Level 5 in Word Mastery.',
        type: 'Category',
        target: 5,
        rewardXp: 250,
        category: 'Word Mastery'
    }
];

const seedChallenges = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding challenges...');

        await Challenge.deleteMany({});
        console.log('Cleared existing challenges.');

        await Challenge.insertMany(challenges);
        console.log(`Successfully seeded ${challenges.length} challenges!`);

        mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedChallenges();
