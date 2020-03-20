'use strict';

const getGateway = require('../gateway/gateway');
const { v1 } = require('uuid');

module.exports.producir = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    let id = v1();
    let trus_producidos = req.body.trus;
    let ubicacion = req.body.ubicacion;
    let actor = gateway.client._userContext._identity._certificate;
    let fecha = new Date();
    const contract = network.getContract('fabcar');
    let args = JSON.stringify([id, actor, ubicacion, trus_producidos, fecha]);
    let response = await contract.evaluateTransaction('producir', args);
    res.status(200).json(JSON.parse(response.toString()));
  });
};
