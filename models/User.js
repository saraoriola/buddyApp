const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  lastName: String, 
  email: String,
  password: String,
  role: String,
  punctuation: Number,
  tokens: [],
}, { timestamps: true });

UserSchema.statics.findById = async function (id) {
  const user = await this.findOne({ _id: id });
  return user;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;