const mongoose = require('mongoose');

const DoubtSchema = new mongoose.Schema(
  {
    doubt: String,
  },
  { timestamps: true }
);

const Doubt = mongoose.model('Doubt', DoubtSchema);

module.exports = Doubt;
