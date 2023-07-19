const express = require('express');
const router = express.Router();
const DoubtController = require('../controllers/DoubtController');
const { authentication, isAuthor } = require('../middleware/authentication');

//crear una duda( tiene que estar autenticado)
router.post('/createDoubt', authentication, DoubtController.createDoubt);
router.put('/createAnswer/:_id', authentication, DoubtController.createAnswer);

router.get(
  '/getAllDoubtsUsersAnswers',
  DoubtController.getAllDoubtsUsersAnswers
);
router.get(
  '/getAllDoubtsUsersAnswersUser',
  DoubtController.getAllDoubtsUsersAnswersUser
);

//router.get('/getAnswerByAnswer/answer/:answer', DoubtController.getAnswerByAnswer); EXTRA WIP

router.get('/getDoubtByDoubt/doubt/:doubt', DoubtController.getDoubtByDoubt);
router.get('/getDoubtById/id/:_id', DoubtController.getDoubtById);
//actualizar una duda ( tiene que estar autenticado)

router.put(
  '/updateDoubt/id/:_id',
  authentication,
  isAuthor,
  DoubtController.updateDoubt
);
router.delete(
  '/deleteDoubt/id/:_id',
  authentication,
  DoubtController.deleteDoubt
);

module.exports = router;
