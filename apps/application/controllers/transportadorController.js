/* eslint-disable linebreak-style */
'use strict';

const getGateway = require('../gateway/gateway');
const { v1 } = require('uuid');

module.exports.transportar = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    let id = v1();
    let trus = req.body.trus;
    let destino = req.body.destino;
    let actor = gateway.client._userContext._identity._certificate;
    let fecha = new Date();
    const contract = network.getContract('fabcar');
    let args = JSON.stringify([id, trus, destino, actor, fecha]);
    try {
      await contract.submitTransaction('transportar', args);
      let rpta = [];
      for (let i in trus) {
        rpta.push(id + '-' + i);
      }
      res.status(200).json({ trus_transportados: rpta });
    }
    catch (err) {
      if (err.endorsements[0].message.substring(89, 98) === 'no existe') {
        res.status(404).json({ error: err.endorsements[0].message });
      }
      else {
        res.status(500).json({ error: err.endorsements[0].message });
      }
    }
  });
};
