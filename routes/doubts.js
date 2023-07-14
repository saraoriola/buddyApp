const express = require('express');
const router = express.Router();
const DoubtController = require('../controllers/DoubtController');

//crear una duda( tiene que estar autenticado)
router.post('/createDoubt', DoubtController.createDoubt);
//actualizar una duda ( tiene que estar autenticado)
router.put('/updateDoubt/id/:_id', DoubtController.updateDoubt);
router.delete('/deleteDoubt/id/:_id', DoubtController.deleteDoubt);

module.exports = router;
