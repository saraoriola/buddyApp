const express = require('express');
const router = express.Router()

// Import the user controller
const UserController = require('../controllers/UserController');

// Import the authMiddleware
const { authMiddleware } = require('../middleware/authMiddleware');



// Routes for users
// CREATE
router.post('/',UserController.registerUser)
router.post('/login', UserController.loginUser);

//READ
router.get('/', authMiddleware, UserController.getCurrentUser);


//UPDATE

//DELETE

module.exports = router;