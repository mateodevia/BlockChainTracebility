'use strict';

const getGateway = require('../gateway/gateway');
const fabric_network = require('fabric-network');

module.exports.consumir = (req, res) => {
  let id = '12345';
  let trus_consumidos = req.body.trus;
  let ubicacion = req.body.ubicacion;
  let actor = '123456';
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    let args = JSON.stringify([id, actor, ubicacion, trus_consumidos]);
    await contract.submitTransaction('consumir', args);
    console.log('ACAAAA', gateway.client._userContext._identity._certificate);
    res.status(200).json({ msg: 'Trus consumidos correctamente' });
  });
};
