const User = require('../models/User');
//const { Answer } = require('../models/Answer');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js');


const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ _id: payload._id, tokens: token }); // $in: Es un operador de consulta

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


// const isAuthorAnswer = async(req, res, next) => {
//     try {
//         const answer = await Answer.findById(req.params._id);
//         if (order.userId.toString() !== req.user._id.toString()) { 
//             return res.status(403).send({ message: 'Esta respuesta no es tuya' });
//         }
//         next();
//     } catch (error) {
//         console.error(error)
//         return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría de la respuesta' })
//     }
// }


module.exports = { authentication, isAdmin };