const { Schema, model, SchemaTypes } = require('mongoose');
const ObjectId = SchemaTypes.ObjectId;

const DoubtSchema = new Schema(
  {
    doubt: { type: String, required: [true, 'Please, fill in the doubt'] },
    user: { type: ObjectId, ref: 'User' },
    answers: [
      {
        answer: {
          type: String,
          required: [true, 'Please, fill in the answer'],
        },
        user: { type: ObjectId, ref: 'User' },
        votes: Number,
      },
    ],
  },
  { timestamps: true }
);

const Doubt = model('Doubt', DoubtSchema);

module.exports = Doubt;
