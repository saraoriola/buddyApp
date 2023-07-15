// Importing models and Sequelize
const { User } = require('../models/user');
const { Token } = require('../models/token');

// Importing JWT library for token verification
const jwt = require('jsonwebtoken');

// Importing JWT secret from config
const { jwt_secret } = require('../config/config.json')['development'];

// Middleware for authentication
const authMiddleware = async (req, res, next) => {
  try {
    // Extracting token from headers
    const token = req.headers.authorization;

    // Verifying the token
    const payload = jwt.verify(token, jwt_secret);

    // Finding user based on the payload ID
    const user = await User.findByPk(payload.id);
    console.log(user);

    // Checking if the token exists for the user
    const tokenFound = await Token.findOne({
      where: {
        [Op.and]: [
          { UserId: user.id },
          { token: token }
        ]
      }
    });

    // If token is not found, user is not authorized
    if (!tokenFound) {
      return res.status(401).send({ message: 'You are not authorized' });
    }

    // Assigning the user to the request object for further use
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: 'Error validating access token' });
  }
};

// Middleware for checking if the user is an admin
const isAdmin = async (req, res, next) => {
  const admins = ['teacher', 'teacherAsistant'];
  if (!admins.includes(req.userId.role)) {
    return res.status(403).send({
      message: 'User does not have permission to perform this action.'
    });
  }
  next();
};

// Exporting the middlewares
module.exports = { authMiddleware, isAdmin };