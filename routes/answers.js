const express = require('express');
const router = express.Router();
const VoteController = require('../controllers/AnswerController');

router.put('/answers/:answerId/votes', VoteController.giveVote);

router.put('/answers/:answerId/votes/remove', VoteController.removeVote);

module.exports = router;
