const express = require('express');
const router = express.Router()

// Import the user controller
const UserController = require('../controllers/UserController');

// Import the authorization
const { authorization } = require('../middleware/authorization');



// Routes for users
// CREATE
router.post('/',UserController.registerUser)
router.post('/login', UserController.loginUser);

//READ
router.get('/', authorization, UserController.getCurrentUser);

//UPDATE
router.put('/users/:_id/points', authorization, UserController.givePoints);

//DELETE
router.delete('/logout', authorization, UserController.logoutUser);

module.exports = router;