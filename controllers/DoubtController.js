const Doubts = require('../models/Doubts.js');

const DoubtController = {
  // crear una duda (tiene que estar autenticado)
  async createDoubt(req, res) {
    try {
      const doubt = await Doubts.create({
        ...req.body,
        user: req.user._id,
      });

      res.status(201).send({ message: 'Successful doubt created', doubt });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Sorry, there was a problem creating your question' });
    }
  },
  // Endpoint para traer todas las dudas junto a los usuarios que hicieron esas dudas y junto a las respuestas de la duda.
  async getAllDoubtsUsersAnswers(req, res) {
    try {
      const all = {};
      const allDoubtsUsersAnswers = await Doubts.find()
        .populate('user')
        .populate('answers.user');
      res.send({ message: 'Successful answer created', allDoubtsUsersAnswers });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message:
          'Sorry, there was a problem to show all doubts, the users or their answers',
      });
    }
  },
  //Endpoint para buscar duda por nombre
  async getDoubtByDoubt(req, res) {
    try {
      if (req.params.doubt.length > 20) {
        return res.status(400).send('Sorry, search too long');
      }
      const doubt = new RegExp(req.params.doubt, 'i');
      const doubts = await Doubts.find({ doubt });
      res.send(doubts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Sorry, there was a problem finding the doubt' });
    }
  },
  //Endpoint para buscar duda por id
  async getDoubtById(req, res) {
    try {
      const doubt = await Doubts.findById(req.params._id).populate('user'); //aggregation operator, which lets you reference documents in other collections.
      res.send({ message: 'Successful doubt find', doubt });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Sorry, there was a problem finding the doubt' });
    }
  },
  //actualizar una duda (tiene que estar autenticado)
  async updateDoubt(req, res) {
    try {
      const doubt = await Doubts.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.send({ message: 'Successful doubt update' });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `Sorry, the doubt cannot be updated after 30'` }); //
    }
  },
  //Endpoint para eliminar una duda(tiene que estar autenticado)
  async deleteDoubt(req, res) {
    try {
      const doubt = await Doubts.findByIdAndDelete(req.params._id);
      res.send({ message: 'Successful doubt delete', doubt });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Sorry, there was a problem deleting your question' });
    }
  },
  // Endpoint para crear una respuesta en una determinada duda
  async createAnswer(req, res) {
    try {
      const answer = { answer: req.body.answer, user: req.user.id };
      await Doubts.findOneAndUpdate(
        { _id: req.body.doubt },
        { $push: { answers: answer } }
      );
      const result = await Doubts.findById(req.body.doubt)
        .populate('user')
        .populate('answers.user');
      res.status(201).send({ message: 'Successful answer created', result });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Sorry, there was a problem to create the answers',
      });
    }
  },
  //Read respuesta
  async getAnswerByAnswer(req, res) {
    try {
      if (req.params.answer.length > 20) {
        return res.status(400).send('Sorry, search too long');
      }
      const answer = new RegExp(req.params.answer, 'i');
      console.log(answer);
      const answers = await Doubts.find({ answer }); //?????????????????? DUUUDA buscar dentro del array que está en un obj   da []
      console.log(answers);
      res.send(answers);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Sorry, there was a problem finding the answer' });
    }
  },

  //Update respuesta

  //Delete respuesta

  //Dar un voto a una respuesta

  //Quitar un voto a una respuesta
};
module.exports = DoubtController;