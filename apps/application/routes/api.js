/* eslint-disable linebreak-style */
'use strict';

const express = require('express');
let router = express.Router();
const apiController = require('../controllers/apiController');
const consumidor = require('../controllers/consumidorController');
const proveedor = require('../controllers/proveedorController');
const transportador = require('../controllers/transportadorController');
const regulador = require('../controllers/reguladorController');
const transformador = require('../controllers/transformadorController');

router.get('/trus/id/:id', apiController.getTruById);
router.get('/actores/:actor/trus/:sku', apiController.getTruBySku);
router.get('/trus/upc/:upc', apiController.getTruByUpc);
router.post('/actor', apiController.registrarActor);
router.post('/transaccion', apiController.crearTransaccion);
router.post('/actividad/consumir', consumidor.consumir);
router.post('/actividad/producir', proveedor.producir);
router.post('/actividad/transportar', transportador.transportar);
router.post('/actividad/invalidar', regulador.invalidar);
router.post('/actividad/transformar', transformador.transformar);
router.get('/trus/id/:id/origen', apiController.origen);
router.get('/trus/id/:id/destino', apiController.destino);
router.get('/actores/:actor/trus/:sku/origen', apiController.origenSku);

module.exports = router;
