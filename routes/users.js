const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.get('/confirm/:emailToken', UserController.confirm);
router.get('/', authentication, UserController.getCurrentUser);
router.get('/search', authentication, UserController.searchUserByName);
router.get('/:id', authentication, UserController.getUserById);
router.get('/me', authentication, UserController.getCurrentUserWithDoubts);
router.get('/ranking', UserController.getRanking);
  

router.put('/:_id/givePoints', authentication, isAdmin, UserController.givePoints);
router.put('/:_id/points/remove', authentication, isAdmin, UserController.removePoints);


router.delete('/logout', authentication, UserController.logoutUser);

module.exports = router;
