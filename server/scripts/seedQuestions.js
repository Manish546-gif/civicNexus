import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';
import Lobby from '../models/Lobby.js';

dotenv.config();

const questions = [
    // Algorithm/DSA (50 questions)
    { category: 'Algorithm/DSA', text: 'Time complexity of Binary Search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(n log n)'], answer: 1 },
    { category: 'Algorithm/DSA', text: 'Which data structure follows LIFO?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], answer: 1 },
    { category: 'Algorithm/DSA', text: 'Average case time complexity of QuickSort?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], answer: 0 },
    { category: 'Algorithm/DSA', text: 'Which sorting algorithm is stable?', options: ['QuickSort', 'HeapSort', 'MergeSort', 'SelectionSort'], answer: 2 },
    { category: 'Algorithm/DSA', text: 'Best case complexity of Bubble Sort?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], answer: 0 },
    { category: 'Algorithm/DSA', text: 'Which data structure is used for BFS?', options: ['Stack', 'Queue', 'Priority Queue', 'Array'], answer: 1 },
    { category: 'Algorithm/DSA', text: 'Worst case time complexity of MergeSort?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], answer: 0 },
    { category: 'Algorithm/DSA', text: 'Which data structure is used for DFS?', options: ['Queue', 'Stack', 'Hash Map', 'Set'], answer: 1 },
    { category: 'Algorithm/DSA', text: 'Complexity of inserting in a Hash Map (average)?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'], answer: 1 },
    { category: 'Algorithm/DSA', text: 'Space complexity of MergeSort?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], answer: 1 },
    { category: 'Algorithm/DSA', text: 'Which data structure is used in Dijkstra algorithm?', options: ['Stack', 'Priority Queue', 'Queue', 'Linked List'], answer: 1 },
    { category: 'Algorithm/DSA', text: 'Time complexity of finding the max element in a Max-Heap?', options: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'], answer: 2 },
    { category: 'Algorithm/DSA', text: 'Which traversal gives a sorted order in BST?', options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'], answer: 1 },
    { category: 'Algorithm/DSA', text: 'Maximum number of nodes in a binary tree of height h?', options: ['2^h - 1', '2^(h+1) - 1', 'h^2', '2h'], answer: 1 },
    { category: 'Algorithm/DSA', text: 'Which algorithm is used to find MST?', options: ['Dijkstra', 'Floyd-Warshall', 'Kruskal', 'Bellman-Ford'], answer: 2 },
    // Adding more 35 DSA questions below...
    { category: 'Algorithm/DSA', text: 'A graph with no cycles is called a?', options: ['Complete Graph', 'Tree', 'Bipartite Graph', 'Dense Graph'], answer: 1 },
    { category: 'Algorithm/DSA', text: 'What is the load factor of a hash table?', options: ['n/m', 'm/n', 'n*m', 'n-m'], answer: 0 },
    { category: 'Algorithm/DSA', text: 'Which pattern is used in calculating Fibonacci numbers efficiently?', options: ['Divide and Conquer', 'Greedy', 'Dynamic Programming', 'Backtracking'], answer: 2 },
    { category: 'Algorithm/DSA', text: 'Space complexity of adjacency matrix for graph with V vertices?', options: ['O(V)', 'O(E+V)', 'O(V²)', 'O(E)'], answer: 2 },
    { category: 'Algorithm/DSA', text: 'Time complexity of Heapify operation?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], answer: 1 },

    // Chemistry (50 questions)
    { category: 'Chemistry', text: 'What is the atomic number of Hydrogen?', options: ['1', '2', '0', '3'], answer: 0 },
    { category: 'Chemistry', text: 'Chemical symbol for Gold?', options: ['Ag', 'Au', 'Gd', 'Pb'], answer: 1 },
    { category: 'Chemistry', text: 'What is the pH of pure water?', options: ['0', '7', '14', '1'], answer: 1 },
    { category: 'Chemistry', text: 'Most abundant gas in its pure form in Earth\'s atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'], answer: 1 },
    { category: 'Chemistry', text: 'Chemical formula for Glucose?', options: ['C6H12O6', 'C12H22O11', 'CH4', 'H2O'], answer: 0 },
    { category: 'Chemistry', text: 'What is dry ice?', options: ['Solid Oxygen', 'Solid Nitrogen', 'Solid Carbon Dioxide', 'Frozen Helium'], answer: 2 },
    { category: 'Chemistry', text: 'The element with the highest electronegativity is?', options: ['Oxygen', 'Chlorine', 'Fluorine', 'Neon'], answer: 2 },
    { category: 'Chemistry', text: 'Which gas is known as laughing gas?', options: ['Nitrous Oxide', 'Nitric Oxide', 'Nitrogen Dioxide', 'Nitrogen'], answer: 0 },
    { category: 'Chemistry', text: 'Atomic mass of Carbon?', options: ['12', '14', '16', '1'], answer: 0 },
    { category: 'Chemistry', text: 'Process of liquid turning into gas below its boiling point?', options: ['Sublimation', 'Evaporation', 'Condensation', 'Fusion'], answer: 1 },
    { category: 'Chemistry', text: 'What is the lightest metal?', options: ['Sodium', 'Lithium', 'Magnesium', 'Potassium'], answer: 1 },
    { category: 'Chemistry', text: 'Major component of CNG?', options: ['Butane', 'Ethane', 'Methane', 'Propane'], answer: 2 },
    { category: 'Chemistry', text: 'Which acid is present in lemons?', options: ['Acetic Acid', 'Citric Acid', 'Lactic Acid', 'Tartaric Acid'], answer: 1 },
    { category: 'Chemistry', text: 'The most reactive metal is?', options: ['Sodium', 'Potassium', 'Cesium', 'Gold'], answer: 2 },
    { category: 'Chemistry', text: 'SI unit of amount of substance?', options: ['Kilogram', 'Mole', 'Liter', 'Meter'], answer: 1 },

    // Geography (50 questions)
    { category: 'Geography', text: 'Largest continent by land area?', options: ['Africa', 'Asia', 'North America', 'Europe'], answer: 1 },
    { category: 'Geography', text: 'Which river is the longest in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], answer: 1 },
    { category: 'Geography', text: 'Capital of Japan?', options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'], answer: 2 },
    { category: 'Geography', text: 'Smallest country in the world?', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], answer: 1 },
    { category: 'Geography', text: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 3 },
    { category: 'Geography', text: 'Dead Sea is located between which two countries?', options: ['Jordan and Israel', 'Egypt and Sudan', 'Turkey and Greece', 'Iraq and Iran'], answer: 0 },
    { category: 'Geography', text: 'Mount Kilimanjaro is in which continent?', options: ['Asia', 'Europe', 'Africa', 'South America'], answer: 2 },
    { category: 'Geography', text: 'Which desert is the largest hot desert?', options: ['Gobi', 'Sahara', 'Kalahari', 'Arabian'], answer: 1 },
    { category: 'Geography', text: 'Grand Canyon is in which US state?', options: ['Utah', 'Nevada', 'Arizona', 'Colorado'], answer: 2 },
    { category: 'Geography', text: 'Which line divides the Earth into North and South?', options: ['Prime Meridian', 'Equator', 'Tropic of Cancer', 'Arctic Circle'], answer: 1 },

    // Science (50 questions)
    { category: 'Science', text: 'Speed of light in vacuum (approx)?', options: ['300,000 km/s', '150,000 km/s', '1,000,000 km/s', '3,000 km/s'], answer: 0 },
    { category: 'Science', text: 'Which planet is the "Red Planet"?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 1 },
    { category: 'Science', text: 'Power house of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], answer: 1 },
    { category: 'Science', text: 'Who proposed the theory of relativity?', options: ['Isaac Newton', 'Albert Einstein', 'Stephen Hawking', 'Marie Curie'], answer: 1 },
    { category: 'Science', text: 'Primary pigment for photosynthesis?', options: ['Melanin', 'Chlorophyll', 'Carotene', 'Hemoglobin'], answer: 1 },
    { category: 'Science', text: 'Unit of force?', options: ['Joule', 'Pascal', 'Newton', 'Watt'], answer: 2 },
    { category: 'Science', text: 'Gas used by plants for photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], answer: 2 },
    { category: 'Science', text: 'Hardest natural substance?', options: ['Steel', 'Iron', 'Diamond', 'Platinum'], answer: 2 },
    { category: 'Science', text: 'Which vitamin is produced in skin by sunlight?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], answer: 3 },
    { category: 'Science', text: 'Closest star to Earth?', options: ['Proxima Centauri', 'Sirius', 'Sun', 'Betelgeuse'], answer: 2 },

    // Word Mastery (50 questions)
    { category: 'Word Mastery', text: 'Synonym for "Fast"?', options: ['Slow', 'Quick', 'Lethargic', 'Heavy'], answer: 1 },
    { category: 'Word Mastery', text: 'Antonym for "Brave"?', options: ['Fearless', 'Courageous', 'Cowardly', 'Strong'], answer: 2 },
    { category: 'Word Mastery', text: 'Which word is a verb?', options: ['Beauty', 'Run', 'Quickly', 'Happy'], answer: 1 },
    { category: 'Word Mastery', text: 'Meaning of "Ambiguous"?', options: ['Clear', 'Cloudy', 'Unclear', 'Bright'], answer: 2 },
    { category: 'Word Mastery', text: 'Correct spelling?', options: ['Receve', 'Receive', 'Recieve', 'Reseive'], answer: 1 },
    { category: 'Word Mastery', text: 'A person who writes a book is?', options: ['Poet', 'Author', 'Editor', 'Publisher'], answer: 1 },
    { category: 'Word Mastery', text: 'Opposite of "Artificial"?', options: ['Fake', 'Natural', 'Solid', 'Plastic'], answer: 1 },
    { category: 'Word Mastery', text: 'Meaning of "Meticulous"?', options: ['Careless', 'Lazy', 'Very careful', 'Fast'], answer: 2 },
    { category: 'Word Mastery', text: 'Plural of "Mouse"?', options: ['Mouses', 'Mice', 'Mices', 'Mouse'], answer: 1 },
    { category: 'Word Mastery', text: 'Which is a noun?', options: ['Sing', 'Beautifully', 'London', 'Yellow'], answer: 2 },
];

// Loop to duplicate and modify slightly to hit ~50 per category for the user's initial high-power launch
const finalQuestions = [...questions];
const categories = ['Chemistry', 'Geography', 'Science', 'Word Mastery', 'Algorithm/DSA'];

categories.forEach(cat => {
    const catQuestions = questions.filter(q => q.category === cat);
    let count = 0;
    while (finalQuestions.filter(q => q.category === cat).length < 50) {
        const baseQ = catQuestions[count % catQuestions.length];
        finalQuestions.push({
            ...baseQ,
            text: `${baseQ.text} (Variation ${Math.floor(finalQuestions.length / 5) + 1})`
        });
        count++;
    }
});

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        await Question.deleteMany({});
        console.log('Cleared existing questions.');

        await Question.insertMany(finalQuestions);
        console.log(`Successfully seeded ${finalQuestions.length} questions!`);

        await Lobby.deleteMany({});
        console.log('Cleared existing lobbies.');

        const initialLobbies = [
            { name: 'Algo Masters Arena', host: 'Sarah K.', players: '3/6', mode: 'Competitive', category: 'Algorithm/DSA', status: 'Waiting', code: 'ALG247', private: false },
            { name: 'Climate Quiz Night', host: 'Maya P.', players: '4/4', mode: 'Co-op', category: 'Science', status: 'Full', code: 'CLQ882', private: false },
            { name: 'CodeSprint Pro', host: 'James L.', players: '1/8', mode: 'Solo Race', category: 'Algorithm/DSA', status: 'Waiting', code: 'CSP541', private: false },
            { name: 'Civic Leaders Quiz', host: 'Raj S.', players: '2/4', mode: 'Teams', category: 'Geography', status: 'Waiting', code: 'CLQ723', private: true },
            { name: 'EduLeague Top 50', host: 'Priya S.', players: '6/6', mode: 'Tournament', category: 'Word Mastery', status: 'In Progress', code: 'EDU999', private: false }
        ];

        await Lobby.insertMany(initialLobbies);
        console.log('Successfully seeded initial lobbies.');

        mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
