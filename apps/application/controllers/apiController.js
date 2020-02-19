'use strict';

const getGateway = require('../gateway/gateway');

module.exports.get = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    const result = await contract.submitTransaction('metodoPrueba', 'a', 'b', 'c');
    // let response = JSON.parse(result.toString());

    res.status(200).json({ msg: 'Esto es una prueba' });
  });
};

module.exports.post = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    const result = await contract.submitTransaction('metodoPrueba', '1', '2', '3');

    // let response = JSON.parse(result.toString());

    res.status(200).json({ invoked: 'ok' });
  });
};
