'use strict';

const getGateway = require('../gateway/gateway');

module.exports.metodoPrueba = (req, res) => {
  return getGateway.then(async ({ gateway, network }) => {
    const contract = network.getContract('fabcar');
    console.log('llego al endpoint de metodoPrueba');
    const result = await contract.submitTransaction('metodoPrueba', 'a', 'b', 'c');
    console.log(result);
    console.log(result.toString());
    res.status(200).json(result.toJSON());
  });
};
