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
<<<<<<< HEAD
//TODO: no se crea pero muestra el mensaje de creado
=======
>>>>>>> 6a18d42 (WIP getDoubtsUserAndAnswers)

const Doubt = model('Doubt', DoubtSchema);

module.exports = Doubt;
