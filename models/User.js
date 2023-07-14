const mongoose = require('mongoose');

// Verificar si el modelo User ya está compilado
const User = mongoose.models.User
  ? mongoose.model('User')
  : mongoose.model('User', new mongoose.Schema({
      name: String,
      lastName: String,
      email: String,
      password: String,
      role: String, //student
      punctuation: Number
    }, { timestamps: true }));

module.exports = User;
