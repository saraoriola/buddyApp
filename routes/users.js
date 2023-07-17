const express = require('express');
const router = express.Router()

// Import the user controller
const UserController = require('../controllers/UserController');

// Import the authentication // AUTO
const { authentication, isAdmin} = require('../middleware/authentication');

// Routes for users
// CREATE
router.post('/',UserController.registerUser)
router.post('/login', UserController.loginUser);

//READ
router.get('/', authentication, UserController.getCurrentUser);

//UPDATE
router.put('/:_id', authentication, isAdmin, UserController.givePoints);

//DELETE
router.delete('/logout', authentication, UserController.logoutUser);

module.exports = router;