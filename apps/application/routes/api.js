'use strict';

const express = require('express');
let router = express.Router();
const apiController = require('../controllers/apiController');
const consumidor = require('../controllers/consumidorController');
const proveedor = require('../controllers/proveedorController');

router.post('/actor', apiController.registrarActor);
router.get('/tru/:id', apiController.getTruById);
router.get('/tru/:sku', apiController.getTruBySku);
router.post('/consumidor/consumir', consumidor.consumir);
router.post('/productor/producir', proveedor.consumir);

module.exports = router;
