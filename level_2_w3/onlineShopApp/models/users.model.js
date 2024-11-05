const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DB_URL = process.env.DB_URL;

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

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return User.findOne({ email });
            })
            .then(user => {
                if (!user) {
                    throw new Error('User not found');
                }
                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw new Error('Incorrect password');
                        mongoose.disconnect();
                        resolve(user);
                    });
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

const signup = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => User.findOne({ email }))
            .then(user => {
                if (user) {
                    throw new Error('User already has an account');
                }
                return bcrypt.hash(password, 10);
            })
            .then(hashedPassword => User.create({ username, email, password: hashedPassword }))
            .then(newUser => {
                mongoose.disconnect();
                resolve(newUser);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

module.exports = {
    login,
    signup
};
