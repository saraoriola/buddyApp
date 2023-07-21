const express = require('express');
const router = express.Router();
230183;
const DoubtController = require('../controllers/DoubtController');
const { authentication, isAuthor } = require('../middleware/authentication');

router.get(
  '/getAllDoubtsUsersAnswers',
  authentication,
  DoubtController.getAllDoubtsUsersAnswers
);

router.post('/createDoubt', authentication, DoubtController.createDoubt);
router.post('/createAnswer/:_id', authentication, DoubtController.createAnswer);

router.get(
  '/getAllDoubtsUsersAnswersUser',
  authentication,
  DoubtController.getAllDoubtsUsersAnswersUser
);

router.get(
  '/getDoubtByDoubt/doubt/:doubt',
  authentication,
  DoubtController.getDoubtByDoubt
);
router.get(
  '/getDoubtById/id/:id',
  authentication,
  DoubtController.getDoubtById
);

router.put(
  '/markAsResolved/id/:id',
  authentication, isAuthor,
  DoubtController.markAsResolved
);
router.put(
  '/markAsUnresolved/id/:id',
  authentication,
  DoubtController.markAsUnresolved
);

router.put(
  '/updateDoubt/id/:id',
  authentication,
  isAuthor,
  DoubtController.updateDoubt
);
router.delete(
  '/deleteDoubt/id/:_id',
  authentication,
  isAuthor,
  DoubtController.deleteDoubt
);

module.exports = router;
