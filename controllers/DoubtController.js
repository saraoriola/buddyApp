const Doubt = require('../models/Doubts.js');

const DoubtController = {
  // crear una duda (tiene que estar autenticado)
  async createDoubt(req, res) {
    try {
      const doubt = await Doubt.create({
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
  //actualizar una duda (tiene que estar autenticado)
  async updateDoubt(req, res) {
    try {
      const doubt = await Doubt.findByIdAndUpdate(req.params._id, req.body, {
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

  // Endpoint para traer todas las dudas junto a los usuarios que hicieron esas dudas y junto a las respuestas de la duda.
  //TODO: not finished
  async getAllDoubtsUsersAnswers(req, res) {
    try {
      const allDoubtsUsersAnswers = await Doubt.find();
      res.send(allDoubtsUsersAnswers);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message:
          'Sorry, there was a problem to show all doubts, the users or their answers',
      });
    }
  },
  // TODO:Endpoint para crear una respuesta en una determinada duda
  async createAnswer(req, res) {
    try {
      const answer = { answer: req.body.answer, user: req.user.id };
      await Doubt.findOneAndUpdate(
        { _id: req.body.doubt },
        { $push: { answers: answer } }
      );
      const result = await Doubt.findById(req.body.doubt)
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

  //Endpoint para buscar duda por nombre
  async getDoubtByDoubt(req, res) {
    try {
      if (req.params.doubt.length > 20) {
        return res.status(400).send('Sorry, search too long');
      }
      const doubt = new RegExp(req.params.doubt, 'i');
      const doubts = await Doubt.find({ doubt });
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
      const doubt = await Doubt.findById(req.params._id).populate('user'); //aggregation operator, which lets you reference documents in other collections.
      res.send({ message: 'Successful doubt find', doubt });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Sorry, there was a problem finding the doubt' });
    }
  },
  //Endpoint para eliminar una duda(tiene que estar autenticado)
  async deleteDoubt(req, res) {
    try {
      const doubt = await Doubt.findByIdAndDelete(req.params._id);
      res.send({ message: 'Successful doubt delete', doubt });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Sorry, there was a problem deleting your question' });
    }
  },
};
module.exports = DoubtController;
