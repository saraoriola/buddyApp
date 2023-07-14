const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  token: String,
  userId: mongoose.Schema.Types.ObjectId
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
