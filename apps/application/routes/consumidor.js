'use strict';

const express = require('express');
let router = express.Router();
const consumidor = require('../controllers/consumidorController');

router.get('/', consumidor.get);

module.exports = router;