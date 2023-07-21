const User = require('../models/User');
const Doubt = require("../models/Doubt")
const jwt = require('jsonwebtoken');
require('dotenv').config()

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: payload._id, tokens: token });

    if (!user) {
      return res.status(401).send({ message: 'You are not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error, message: 'There was a problem with the token' });
  }
};

const isAdmin = async (req, res, next) => {
  const admins = ['teacher', 'teacherAssistant'];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: 'You do not have permissions',
    });
  }
  next();
};

const isAuthor = async (req, res, next) => {
  try {
    const doubt = await Doubt.findById(req.params._id);
    if (
      doubt.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).send({ message: 'You are not the author' });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error,
      message: 'There was a problem checking the answer authorship',
    });
  }
};

module.exports = { authentication, isAdmin, isAuthor };
