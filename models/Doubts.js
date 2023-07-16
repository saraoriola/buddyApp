const { Schema, model } = require('mongoose');

const DoubtSchema = new Schema(
  {
    doubt: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    answers: [
      {
        answer: String,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        votes: Number,
      },
    ],
  },
  { timestamps: true }
);

//https://mongoosejs.com/docs/validation.html

const Doubt = model('Doubt', DoubtSchema);

module.exports = Doubt;
