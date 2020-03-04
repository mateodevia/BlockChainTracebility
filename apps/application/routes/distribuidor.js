'use strict';

const express = require('express');
let router = express.Router();
const distribuidor = require('../controllers/distribuidorController');

router.get('/', distribuidor.get);

module.exports = router;