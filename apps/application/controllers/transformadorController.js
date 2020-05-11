/* eslint-disable linebreak-style */
'use strict';

const getGateway = require('../gateway/gateway');
const { v1 } = require('uuid');

module.exports.transformar = (req, res) => {
    return getGateway.then(async ({ gateway, network }) => {
        let id = v1();
        let trus_consumidos = req.body.trus_consumidos;
        let trus_producidos = req.body.trus_producidos;
        let actor = req.body.actor;
        let fecha = new Date();
        const contract = network.getContract('fabcar');
        let args = JSON.stringify([
            id,
            trus_consumidos,
            trus_producidos,
            actor,
            fecha,
        ]);
        try {
            let response = await contract.submitTransaction(
                'transformar',
                args
            );
            res.status(200).json(JSON.parse(response.toString()));
        } catch (err) {
            if (
                err.endorsements[0].message.substring(102, 112) === 'no existe'
            ) {
                res.status(404).json({ error: err.endorsements[0].message });
            } else {
                res.status(500).json({ error: err.endorsements[0].message });
            }
        }
    });
};
