'use strict';

const express = require('express');
let router = express.Router();
const enteRegulador = require('../controllers/enteReguladorController');

router.get('/', enteRegulador.get);

module.exports = router;