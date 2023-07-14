const express = require('express');
const router = express.Router()

// Import the user controller
const UserController = require('../controllers/UserController');

// Import the authMiddleware
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');



// Routes for users
// CREATE
router.post('/',UserController.registerUser)
router.post('/login', UserController.loginUser);
router.post('/logout', authMiddleware, UserController.logoutUser);


//READ
router.get('/', authMiddleware, UserController.getCurrentUser);

//UPDATE
router.put('/users/:userId/points', authMiddleware, isAdmin, UserController.givePoints);

//DELETE

module.exports = router;