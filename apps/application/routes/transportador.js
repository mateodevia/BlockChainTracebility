'use strict';

const express = require('express');
let router = express.Router();
const transportador = require('../controllers/transportadorController');

router.get('/', transportador.get);

module.exports = router;