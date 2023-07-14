const Doubt = require('../models/Doubts.js');
const DoubtController = {
  // crear una duda
  async createDoubt(req, res) {
    try {
      console.log(Doubt); //delete
      const doubt = await Doubt.create(req.body);

      res.status(201).send({ message: 'Successful doubt created', doubt });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Sorry, there was a problem creating your question' });
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
  //Endpoint para eliminar una duda( tiene que estar autenticado)
  async deleteDoubt(req, res) {
    try {
      const product = await Doubt.findByIdAndDelete(req.params._id);
      res.send({ message: 'Successful doubt delete', product });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Sorry, there was a problem deleting your question' });
    }
  },
};
module.exports = DoubtController;
