'use strict';

const express = require('express');
let router = express.Router();
const proveedor = require('../controllers/proveedorController');

router.post('/', proveedor.registrarProveedor);
router.post('/actividades/producir', proveedor.producir);
router.post('/transaccion', proveedor.crearTransaccion);

module.exports = router;