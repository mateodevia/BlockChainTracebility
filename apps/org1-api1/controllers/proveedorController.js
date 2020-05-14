/* eslint-disable linebreak-style */
'use strict';

const getGateway = require('../gateway/gateway');
const { v1 } = require('uuid');

module.exports.producir = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    let id = v1();
    let trus_producidos = req.body.trus;
    let ubicacion = req.body.ubicacion;
    let actor = req.body.actor;
    //let actor = gateway.client._userContext._identity._certificate;
    let fecha = new Date();
    const contract = network.getContract('chaincode');
    let args = JSON.stringify([id, actor, ubicacion, trus_producidos, fecha]);
    await contract.submitTransaction('producir', args);
    let rpta = [];
    for (let i in trus_producidos) {
      rpta.push(id + '-' + i);
    }
    res.status(200).json({ trus_producidos: rpta });
  });
};
