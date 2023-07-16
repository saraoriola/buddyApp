const express = require('express');
const router = express.Router();
const DoubtController = require('../controllers/DoubtController');
const { authentication } = require('../middleware/authentication');

router.post('/createAnswer', authentication, DoubtController.createAnswer);

module.exports = router;
