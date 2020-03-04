'use strict';

const express = require('express');
let router = express.Router();
const apiRouter = require('./api');
const consumidor = require('./consumidor');
const proveedor = require('./proveedor');
const transportador = require('./transportador');
const transformador = require('./transformador');
const distribuidor = require('./distribuidor');
const enteRegulador = require('./enteRegulador');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const swaggerDocument = yaml.safeLoad(fs.readFileSync('./swagger.yaml'));

router.use('/v1/api', apiRouter);
router.use('/consumidor', consumidor);
router.use('/proveedor', proveedor);
router.use('/transportador', transportador);
router.use('/transformador', transformador);
router.use('/distribuidor', distribuidor);
router.use('/enteRegulador', enteRegulador);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
