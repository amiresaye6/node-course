const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

// Login function
const login = async (email, password) => {
    try {
        // Ensure the database is connected before any operation
        await connectToDatabase();
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Incorrect password");

        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Signup function
const signup = async (username, email, password) => {
    try {
        // Ensure the database is connected before any operation
        await connectToDatabase();
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("User already has an account");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        return newUser;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Function to connect to the database
const connectToDatabase = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("Connected to MongoDB");
        }
    } catch (err) {
        throw new Error("Error connecting to the database: " + err.message);
    }
};

module.exports = {
    login,
    signup
};
