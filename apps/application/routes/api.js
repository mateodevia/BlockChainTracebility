'use strict';

const express = require('express');
let router = express.Router();
const apiController = require('../controllers/apiController');
const proveedor = require('../controllers/proveedorController');

router.post('/actor', apiController.registrarActor);

module.exports = router;
