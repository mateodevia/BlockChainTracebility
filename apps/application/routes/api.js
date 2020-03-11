'use strict';

const express = require('express');
let router = express.Router();
const apiController = require('../controllers/apiController');
const proveedor = require('../controllers/proveedorController');

router.get('/', apiController.get);
router.get('/metodoPrueba', apiController.metodoPrueba);
router.get('/proveedor', proveedor.registrarProveedor);

module.exports = router;
