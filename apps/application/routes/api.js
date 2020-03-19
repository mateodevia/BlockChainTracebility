'use strict';

const express = require('express');
let router = express.Router();
const apiController = require('../controllers/apiController');
const consumidor = require('../controllers/consumidorController');
const proveedor = require('../controllers/proveedorController');

router.get('/tru/', apiController.getTruById);
router.post('/actor', apiController.registrarActor);
router.post('/consumidor/consumir', consumidor.consumir);

module.exports = router;
