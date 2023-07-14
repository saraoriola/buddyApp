const { User } = require('../models');
//TODO: WIP
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);
    const user = await Token.findOne();
  } catch (error) {}
};

const isAdmin = async (req, res, next) => {
  const admins = ['admin', 'superadmin'];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: 'You do not have permissions',
    });
  }
  next();
};

module.exports = { authentication, isAdmin };
