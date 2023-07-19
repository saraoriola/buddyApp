const { Schema, model } = require('mongoose');

const DoubtSchema = new Schema(
  {
    doubt: { type: String, required: [true, 'Please, fill in the doubt'] },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    answers: [
      {
        answer: {
          type: String,
          required: [true, 'Please, fill in the answer'],
        },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        votes: Number,
      },
    ],
  },
  { timestamps: true }
);

const Doubt = model('Doubt', DoubtSchema);

module.exports = Doubt;
