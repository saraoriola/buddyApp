const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/', UserController.registerUser); //TEST OK
router.post('/login', UserController.loginUser); //TEST OK

router.get('/confirm/:emailToken', UserController.confirm); //TEST OK
router.get('/recoverPassowrd/:email',UserController.recoverPassword) //TEST OK
router.get('/', authentication, UserController.getCurrentUser); //TEST OK
router.get('/search', authentication, UserController.searchUserByName); //TEST OK
router.get('/:id', authentication, UserController.getUserById); //TEST OK
// router.get('/withDoubts', authentication, UserController.getUsersWithDoubts); //TEST FAIL
//router.get('/ranking', UserController.getRanking); //TEST FAIL
  
router.put('/resetPassword/:recoverToken',UserController.resetPassword) //TEST OK
router.put('/:id/givePoints', authentication, isAdmin, UserController.givePoints); //TEST OK
router.put('/:id/removePoints', authentication, isAdmin, UserController.removePoints); //TEST OK


router.delete('/logout', authentication, UserController.logoutUser); //TEST OK

module.exports = router;
