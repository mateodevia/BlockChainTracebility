'use strict';

const express = require('express');
let router = express.Router();
const apiController = require('../controllers/apiController');
const consumidor = require('../controllers/consumidorController');
const proveedor = require('../controllers/proveedorController');

router.get('/tru/id/:id', apiController.getTruById);
router.get('/tru/sku/:sku', apiController.getTruBySku);
router.post('/actor', apiController.registrarActor);
router.post('/consumidor/consumir', consumidor.consumir);
router.post('/productor/producir', proveedor.producir);

module.exports = router;
