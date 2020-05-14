/* eslint-disable linebreak-style */
'use strict';

const getGateway = require('../gateway/gateway');
const { v1 } = require('uuid');

module.exports.invalidar = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    let id = v1();
    let trus = req.body.trus;
    let actor = gateway.client._userContext._identity._certificate;
    let fecha = new Date();
    const contract = network.getContract('chaincode');
    let args = JSON.stringify([id, trus, actor, fecha]);
    try {
      await contract.submitTransaction('invalidar', args);
      res.status(200).json({ msg: 'TRUs invalidadps correctamente' });
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
