'use strict';

const express = require('express');
let router = express.Router();
const proveedor = require('../controllers/proveedorController');

router.get('/', proveedor.get);

module.exports = router;