'use strict';

const express = require('express');
let router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/', apiController.get);
router.get('/metodoPrueba', apiController.metodoPrueba);

module.exports = router;
