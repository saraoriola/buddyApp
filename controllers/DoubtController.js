const Doubt = require('../models/Doubt.js');

const DoubtController = {
  async createDoubt(req, res, next) {
    try {
      req.body.resolved = false;
      const { doubt } = req.body;

      const existingDoubt = await Doubt.findOne({ doubt });
      if (existingDoubt) {
        return res.status(409).json({ message: 'This doubt already exists' });
      }

      const createdDoubt = await Doubt.create({
        ...req.body,
        user: req.user._id,
      });

      res
        .status(201)
        .send({ message: 'Successful doubt created', doubt: createdDoubt });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  async getAllDoubtsUsersAnswers(req, res, next) {
    try {
      const all = {};
      const { page = 1, limit = 10 } = req.query;
      const allDoubtsUsersAnswers = await Doubt.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .populate('user', 'name')
        .populate('answers.user', 'name');
      res.send({ message: 'Successful answer shown', allDoubtsUsersAnswers });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async getDoubtByDoubt(req, res, next) {
    try {
      if (req.params.doubt.length > 20) {
        return res.status(400).send('Sorry, search too long');
      }
      const doubt = new RegExp(req.params.doubt, 'i');
      console.log(req.params.doubt);
      const doubts = await Doubt.find({ doubt });
      console.log(doubts);
      res.status(200).send({ message: 'Your search is ...', doubts });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async getAllDoubtsUsersAnswersUser(req, res, next) {
    try {
      const all = {};
      const { page = 1, limit = 10 } = req.query;
      const allDoubtsUsersAnswers = await Doubt.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .populate('user', 'name')
        .populate('answers.user', 'name');
      res.send({ message: 'Successful answer shown', allDoubtsUsersAnswers });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async getDoubtById(req, res, next) {
    try {
      const doubt = await Doubt.findById(req.params.id);
      console.log(doubt);
      res.send({ message: 'Successful doubt find', doubt });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async updateDoubt(req, res, next) {
    try {
      const doubt = await Doubt.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.send({ message: 'Successful doubt update', doubt });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async deleteDoubt(req, res, next) {
    try {
      const doubt = await Doubt.findByIdAndDelete(req.params._id);
      res.send({ message: 'Successful doubt delete', doubt });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async createAnswer(req, res, next) {
    try {
      if (!req.body.answer) {
        return res.status(400).send('Please, fill in your answer');
      }
      const answer = await Doubt.findByIdAndUpdate(
        req.params._id,
        {
          $push: {
            answers: { answer: req.body.answer, userId: req.user._id },
          },
        },
        { new: true }
      );
      console.log(answer);
      await Doubt.findById(req.body.doubt).populate('user', 'answers.user');
      res.status(201).send({ message: 'Successful answer created', answer });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async markAsResolved(req, res, next) {
    try {
      const resolved = await Doubt.findByIdAndUpdate(
        req.params.id,
        { resolved: true },
        { new: true }
      );
      res.status(200).send({ message: 'This doubt was resolved', resolved });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async markAsUnresolved(req, res, next) {
    try {
      const unresolved = await Doubt.findByIdAndUpdate(
        req.params.id,
        { resolved: false },
        { new: true }
      );
      res.status(200).send({ message: 'This doubt is unresolved', unresolved });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

module.exports = DoubtController;
