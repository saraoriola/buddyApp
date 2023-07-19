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
//TODO: no se crea pero muestra el mensaje de creado

const Doubt = model('Doubt', DoubtSchema);

module.exports = Doubt;
