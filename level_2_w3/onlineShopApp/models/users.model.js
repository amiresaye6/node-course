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
    }
});

const User = mongoose.model('User', userSchema);

// Login function
const login = async (email, password) => {
    try {
        // Ensure the database is connected before any operation
        if (mongoose.connection.readyState !== 1) {
            throw new Error("Database not connected");
        }
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
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("User already has an account");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        return newUser;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    login,
    signup
};
