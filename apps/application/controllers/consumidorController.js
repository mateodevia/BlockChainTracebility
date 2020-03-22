/* eslint-disable linebreak-style */
'use strict';

const getGateway = require('../gateway/gateway');
const { v1 } = require('uuid');

module.exports.consumir = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    let id = v1();
    let trus_consumidos = req.body.trus;
    let ubicacion = req.body.ubicacion;
    let actor = gateway.client._userContext._identity._certificate;
    const contract = network.getContract('fabcar');
    let args = JSON.stringify([id, actor, ubicacion, trus_consumidos]);
    try {
      await contract.submitTransaction('consumir', args);
      res.status(200).json({ msg: 'Trus consumidos correctamente' });
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
