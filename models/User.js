const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    role: String, //student
    punctuation: Number
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
