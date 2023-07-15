const { User } = require('../models');
//TODO: WIP
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authentication;
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ _id: payload._id, tokens: { $in: [token] } });

    if (!user) {
      return res.status(401).send({ message: 'No estás autorizado' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error, message: 'Ha habido un problema con el token' });
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

module.exports = { authentication, isAdmin };
