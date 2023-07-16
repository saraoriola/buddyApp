const express = require('express');
const router = express.Router();
const DoubtController = require('../controllers/DoubtController');
const { authentication } = require('../middleware/authentication');

//crear una duda( tiene que estar autenticado)
router.post('/createDoubt', authentication, DoubtController.createDoubt);

router.post('/createAnswer', authentication, DoubtController.createAnswer);
// router.get(
//   '/getAllDoubtsUsersAnswers',
//   DoubtController.getAllDoubtsUsersAnswers
// );
router.get('/getDoubtByDoubt/doubt/:doubt', DoubtController.getDoubtByDoubt);
router.get('/getDoubtById/id/:_id', DoubtController.getDoubtById);
//actualizar una duda ( tiene que estar autenticado)

router.put('/updateDoubt/id/:_id', authentication, DoubtController.updateDoubt);
router.delete(
  '/deleteDoubt/id/:_id',
  authentication,
  DoubtController.deleteDoubt
);

module.exports = router;
