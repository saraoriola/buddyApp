const express = require('express');
const router = express.Router(); 230183
const DoubtController = require('../controllers/DoubtController');
const { authentication, isAuthor } = require('../middleware/authentication');

// //crear una duda( tiene que estar autenticado)

router.get('/getAllDoubtsUsersAnswers', authentication, DoubtController.getAllDoubtsUsersAnswers); 

router.post('/createDoubt', authentication, DoubtController.createDoubt);
router.post('/createAnswer/:_id', authentication, DoubtController.createAnswer); 


//router.get('/getAnswerByAnswer/answer/:answer', DoubtController.getAnswerByAnswer); EXTRA WIP
// router.get('/getAllDoubtsUsersAnswersUser',DoubtController.getAllDoubtsUsersAnswersUser);
// router.get('/getAllDoubtsUsersAnswers',DoubtController.getAllDoubtsUsersAnswers);
// //router.get('/getAnswerByAnswer/answer/:answer', DoubtController.getAnswerByAnswer); EXTRA WIP
// router.get('/getAllDoubtsUsersAnswersUser',DoubtController.getAllDoubtsUsersAnswersUser);

// router.get('/getDoubtByDoubt/doubt/:doubt', DoubtController.getDoubtByDoubt);
// router.get('/getDoubtById/id/:_id', DoubtController.getDoubtById);

router.put('/updateDoubt/id/:_id', authentication, isAuthor, DoubtController.updateDoubt); 
router.delete('/deleteDoubt/id/:_id', authentication, isAuthor, DoubtController.deleteDoubt);

module.exports = router;
