/* eslint-disable linebreak-style */
'use strict';

const getGateway = require('../gateway/gateway');
const { v1 } = require('uuid');

module.exports.transportar = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    let id = v1();
    let trus_consumidos = req.body.trus_consumidos;
    let trus_producidos = req.body.trus_producidos;
    let actor = gateway.client._userContext._identity._certificate;
    let fecha = new Date();
    const contract = network.getContract('fabcar');
    let args = JSON.stringify([id, trus_consumidos, trus_producidos, actor, fecha]);
    try {
      await contract.submitTransaction('transformar', args);
      res.status(200).json({ msg: 'TRUs transformados correctamente' });
    }
    catch (err) {
      if (err.endorsements[0].message.substring(102, 112) === 'no existe') {
        res.status(404).json({ error: err.endorsements[0].message });
      }
      else {
        res.status(500).json({ error: err.endorsements[0].message });
      }
    }
  });
};