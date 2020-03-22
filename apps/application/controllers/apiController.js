/* eslint-disable linebreak-style */
'use strict';

const getGateway = require('../gateway/gateway');
const { v1 } = require('uuid');

module.exports.registrarActor = (req, res) => {
  let nombre = req.body.nombre;
  let identificacion = req.body.identificacion;
  let tipo = req.body.tipo;
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    let args = JSON.stringify([nombre, identificacion, tipo]);
    await contract.submitTransaction('registerActor', args);
    res.status(200).json({ msg: 'Actor registrado correctamente' });
  });
};

module.exports.getTruById = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    try {
      let response = await contract.evaluateTransaction('getTruById', req.params.id.toString());
      res.status(200).json(JSON.parse(response.toString()));
    }
    catch (err) {
      res.status(404).json({ error: err.message });
    }
  });
};

module.exports.getTruBySku = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    try {
      let response = await contract.evaluateTransaction('getTruBySku', req.params.sku.toString(), req.params.actor.toString());
      console.log(response.toString());
      res.status(200).json(JSON.parse(response.toString()));
    }
    catch (err) {
      res.status(404).json({ error: err.message });
    }
  });
};

module.exports.getTruByUpc = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    try {
      let response = await contract.evaluateTransaction('getTruById', req.params.upc.toString());
      console.log(response.toString());
      res.status(200).json(JSON.parse(response.toString()));
    }
    catch (err) {
      res.status(404).json({ error: err.message });
    }
  });
};

module.exports.crearTransaccion = (req, res) => {
  let id = v1();
  let trus = req.body.trus;
  let fuente = req.body.fuente;
  let destino = req.body.destino;
  let fecha = new Date();
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    let args = JSON.stringify([id, trus, fuente, destino, fecha]);
    try {
      await contract.submitTransaction('crearTransaccion', args);
      res.status(200).json({ msg: `La transacción se guardó con codigo de identificacion: ${id}` });
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
