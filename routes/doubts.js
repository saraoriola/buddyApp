// const express = require('express');
// const router = express.Router();
// const DoubtController = require('../controllers/DoubtController');
// const { authentication, isAuthor } = require('../middleware/authentication');

// //crear una duda( tiene que estar autenticado)

router.get(
  '/getAllDoubtsUsersAnswers',
  authentication,
  DoubtController.getAllDoubtsUsersAnswers
); // TEST OK

router.post('/createDoubt', authentication, DoubtController.createDoubt); //TEST OK
router.post('/createAnswer/:_id', authentication, DoubtController.createAnswer); // TEST OK

//router.get('/getAnswerByAnswer/answer/:answer', DoubtController.getAnswerByAnswer); EXTRA WIP
// router.get('/getAllDoubtsUsersAnswersUser',DoubtController.getAllDoubtsUsersAnswersUser);
// router.get('/getAllDoubtsUsersAnswers',DoubtController.getAllDoubtsUsersAnswers);
// //router.get('/getAnswerByAnswer/answer/:answer', DoubtController.getAnswerByAnswer); EXTRA WIP
// router.get('/getAllDoubtsUsersAnswersUser',DoubtController.getAllDoubtsUsersAnswersUser);

// router.get('/getDoubtByDoubt/doubt/:doubt', DoubtController.getDoubtByDoubt);
// router.get('/getDoubtById/id/:_id', DoubtController.getDoubtById);
// //actualizar una duda ( tiene que estar autenticado)

// router.put('/updateDoubt/id/:_id',authentication,isAuthor,DoubtController.updateDoubt);

// router.delete('/deleteDoubt/id/:_id',authentication,DoubtController.deleteDoubt);
// router.put('/updateDoubt/id/:_id',authentication,isAuthor,DoubtController.updateDoubt);

// router.delete('/deleteDoubt/id/:_id',authentication,DoubtController.deleteDoub);

// module.exports = router;
