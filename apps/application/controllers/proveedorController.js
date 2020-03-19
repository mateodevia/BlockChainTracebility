'use strict';

const getGateway = require('../gateway/gateway');

module.exports.producir = (req, res) => {
  let id = req.body.id;
  let actor = req.body.actor;
  let ubicacion = req.body.ubicacion;
  let trus_producidos = req.body.trus_producidos;
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    let args = [id, actor, ubicacion, trus_producidos];
    await contract.submitTransaction('registerActor', args);
    res.status(200).json({ msg: 'Trus producidos correctamente' });
  });
};

module.exports.crearTransaccion = (req, res) => {
  let trus = req.body.trus;
  let fuente = req.body.fuente;
  let destino = req.body.destino;
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    let args = [trus, fuente, destino];
    await contract.submitTransaction('registerActor', args);
    res.status(200).json({ msg: 'Crear transaccion' });
  });
};
