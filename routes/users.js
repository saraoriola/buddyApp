const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.get('/', authentication, UserController.getCurrentUser);
router.get('/search', authentication, UserController.searchUserByName);
router.get('/:id', authentication, UserController.getUserById);
router.get('/me', authentication, UserController.getCurrentUserWithDoubts);

router.put('/:id/givePoints', authentication, isAdmin, UserController.givePoints);

router.delete('/logout', authentication, UserController.logoutUser);

module.exports = router;
