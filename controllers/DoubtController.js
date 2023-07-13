const Doubt = require('../models/Doubts.js');

const DoubtController = {
  // crear una duda
  async createDoubt(req, res) {
    try {
      const doubt = await Doubt.create(req.body);
      res.status(201).send({ message: 'Successful doubt created', doubt });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'There was a problem creating your question' });
    }
  },
  //actualizar una duda
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
};
module.exports = DoubtController;
