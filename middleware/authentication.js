const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js');

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const session = jwt.verify(token, jwt_secret);
    const user = await User.findById(session._id);
    req.user = user;
  } catch (error) {
    console.log(error);
    return res.status(403).send({
      message: 'You do not have permissions',
    });
  }
  next();
};

module.exports = { authentication };
