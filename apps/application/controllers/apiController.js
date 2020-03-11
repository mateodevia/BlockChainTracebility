'use strict';

const getGateway = require('../gateway/gateway');

module.exports.metodoPrueba = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    const result = await contract.submitTransaction('metodoPrueba', 'a', 'b', 'c');
    res.status(200).json(result);
  });
};

module.exports.get = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    const result = await contract.submitTransaction('invoke', '1', '2', '3');
    // let response = JSON.parse(result.toString());
    res.status(200).json(result);
  });
};
