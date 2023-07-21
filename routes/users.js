const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.get('/confirm/:emailToken', UserController.confirm);
router.get('/recoverPassowrd/:email', UserController.recoverPassword);
router.get('/', authentication, UserController.getCurrentUser);
router.get('/search', authentication, UserController.searchUserByName);
router.get('/id/:_id', authentication, UserController.getUserById);
router.get('/withDoubts', authentication, UserController.getUsersWithDoubts);
router.get('/ranking', UserController.getRanking);

router.put('/resetPassword/:recoverToken', UserController.resetPassword);
router.put(
  '/:_id/givePoints',
  authentication,
  isAdmin,
  UserController.givePoints
);
router.put(
  '/:_id/removePoints',
  authentication,
  isAdmin,
  UserController.removePoints
);

router.delete('/logout', authentication, UserController.logoutUser);

module.exports = router;
