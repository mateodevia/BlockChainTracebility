'use strict';

const express = require('express');
let router = express.Router();
const apiController = require('../controllers/apiController');
const proveedor = require('../controllers/proveedorController');

router.get('/metodoPrueba', apiController.metodoPrueba);
router.post('/proveedor', proveedor.registrarProveedor);

module.exports = router;
