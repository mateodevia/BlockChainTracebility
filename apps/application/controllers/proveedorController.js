'use strict';

const getGateway = require('../gateway/gateway');

module.exports.producir = (req, res) => {
  let id = 12345;
  let trus_producidos = req.body.trus;
  let ubicacion = req.body.ubicacion;
  let actor = 123456;
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
