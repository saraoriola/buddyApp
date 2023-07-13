const express = require('express');
const router = express.Router()

// Import the user controller
const UserController = require('../controllers/UserController');


// Routes for users
// CREATE
router.post('/',UserController.registerUser)
router.post('/login', UserController.loginUser);

//READ

//UPDATE

//DELETE

module.exports = router;