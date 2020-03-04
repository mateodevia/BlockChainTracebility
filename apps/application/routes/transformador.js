'use strict';

const express = require('express');
let router = express.Router();
const transformador = require('../controllers/transformadorController');

router.get('/', transformador.get);

module.exports = router;