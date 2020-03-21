
/* eslint-disable linebreak-style */
'use strict';

const getGateway = require('../gateway/gateway');

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
    let response = await contract.evaluateTransaction('getTruById', req.params.id.toString());
    res.status(200).json(JSON.parse(response.toString()));
  });
};

module.exports.getTruBySku = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    let response = await contract.evaluateTransaction('getTruBySku', req.params.sku.toString());
    console.log(response.toString());
    res.status(200).json(JSON.parse(response.toString()));
  });
};

module.exports.crearTransaccion = (req, res) => {
  let trus = req.body.trus;
  let fuente = req.body.fuente;
  let destino = req.body.destino;
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    let args = [trus, fuente, destino];
    await contract.evaluateTransaction('registerActor', args);
    res.status(200).json({ msg: 'Crear transaccion' });
  });
};
