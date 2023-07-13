const express = require('express');
const router = express.Router();
const DoubtController = require('../controllers/DoubtController');

//crear una duda( tiene que estar autenticado)
router.post('/createDoubt', DoubtController.createDoubt);
//actualizar una duda ( tiene que estar autenticado)
router.put('/updateDoubt', DoubtController.updateDoubt);

module.exports = router;
