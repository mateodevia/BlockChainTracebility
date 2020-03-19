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
