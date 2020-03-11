'use strict';

const getGateway = require('../gateway/gateway');

module.exports.metodoPrueba = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    console.log('llego al endpoint de metodoPrueba');
    const result = await contract.submitTransaction('metodoPrueba', 'a', 'b', 'c');
    res.status(200).json(result);
  });
};

module.exports.get = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    console.log('llego al endpoint de get');
    const result = await contract.submitTransaction('invoke', '1', '3', '1');
    // let response = JSON.parse(result.toString());
    res.status(200).json(result);
  });
};
