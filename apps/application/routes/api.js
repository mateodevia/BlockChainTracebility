/* eslint-disable linebreak-style */
'use strict';

const express = require('express');
let router = express.Router();
const apiController = require('../controllers/apiController');
const consumidor = require('../controllers/consumidorController');
const proveedor = require('../controllers/proveedorController');
const transportador = require('../controllers/transportadorController');

router.get('/tru/id/:id', apiController.getTruById);
router.get('/tru/sku/:sku', apiController.getTruBySku);
router.post('/actor', apiController.registrarActor);
router.post('/transaccion', apiController.crearTransaccion);
router.post('/actividad/consumir', consumidor.consumir);
router.post('/actividad/producir', proveedor.producir);
router.post('/actividad/transportar', transportador.transportar);

module.exports = router;
