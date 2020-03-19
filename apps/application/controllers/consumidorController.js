'use strict';

const getGateway = require('../gateway/gateway');
const fabric_network = require('fabric-network');
const { v1 } = require('uuid');

module.exports.consumir = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    let id = v1();
    let trus_consumidos = req.body.trus;
    let ubicacion = req.body.ubicacion;
    let actor = gateway.client._userContext._identity._certificate;
    const contract = network.getContract('fabcar');
    let args = JSON.stringify([id, actor, ubicacion, trus_consumidos]);
    await contract.submitTransaction('consumir', args);
    res.status(200).json({ msg: 'Trus consumidos correctamente' });
  });
};
