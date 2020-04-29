/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/
/* eslint-disable linebreak-style */
'use strict';

const shim = require('fabric-shim');
const util = require('util');
const domain = require('./domainLogic');
const data = require('./data');
const utils = require('./utils');

var ABstore = class {
    // Initialize the chaincode
    async Init(stub) {
        console.info('========= Cargando Datos Iniciales =========');
        try {
            //Producir
            await stub.putState(
                'efa91e20-7413-11ea-9fdf-2174e1b0eb66',
                JSON.stringify(data.actividades[0])
            );
            //TRUs producidos
            await stub.putState(
                'efa91e20-7413-11ea-9fdf-2174e1b0eb66-0',
                JSON.stringify(data.trus[0])
            );
            await stub.putState(
                'efa91e20-7413-11ea-9fdf-2174e1b0eb66-1',
                JSON.stringify(data.trus[1])
            );
            await stub.putState(
                'efa91e20-7413-11ea-9fdf-2174e1b0eb66-2',
                JSON.stringify(data.trus[2])
            );
            await stub.putState(
                'efa91e20-7413-11ea-9fdf-2174e1b0eb66-3',
                JSON.stringify(data.trus[3])
            );
            await stub.putState(
                'efa91e20-7413-11ea-9fdf-2174e1b0eb66-4',
                JSON.stringify(data.trus[4])
            );
            await stub.putState(
                'efa91e20-7413-11ea-9fdf-2174e1b0eb66-5',
                JSON.stringify(data.trus[5])
            );
            await stub.putState(
                'efa91e20-7413-11ea-9fdf-2174e1b0eb66-6',
                JSON.stringify(data.trus[6])
            );
            await stub.putState(
                'efa91e20-7413-11ea-9fdf-2174e1b0eb66-7',
                JSON.stringify(data.trus[7])
            );
            await stub.putState(
                'efa91e20-7413-11ea-9fdf-2174e1b0eb66-8',
                JSON.stringify(data.trus[8])
            );
            await stub.putState(
                'efa91e20-7413-11ea-9fdf-2174e1b0eb66-9',
                JSON.stringify(data.trus[9])
            );

            //Transaccion de Propilco al transportador
            await stub.putState(
                '902d2f70-741f-11ea-9fdf-2174e1b0eb66',
                JSON.stringify(data.transacciones[0])
            );

            //Transportar
            await stub.putState(
                '47b2c630-7422-11ea-9dba-a31d6f3c8f24',
                JSON.stringify(data.actividades[1])
            );
            //TRUs producidos
            await stub.putState(
                '47b2c630-7422-11ea-9dba-a31d6f3c8f24-0',
                JSON.stringify(data.trus[10])
            );
            await stub.putState(
                '47b2c630-7422-11ea-9dba-a31d6f3c8f24-1',
                JSON.stringify(data.trus[11])
            );
            await stub.putState(
                '47b2c630-7422-11ea-9dba-a31d6f3c8f24-2',
                JSON.stringify(data.trus[12])
            );
            await stub.putState(
                '47b2c630-7422-11ea-9dba-a31d6f3c8f24-3',
                JSON.stringify(data.trus[13])
            );

            //Transaccion de el transportador y Cartoflex
            await stub.putState(
                'e8373bf0-7449-11ea-9dba-a31d6f3c8f24',
                JSON.stringify(data.transacciones[1])
            );

            //Transformar un bulto en un lote y un bulto con menos material
            await stub.putState(
                'd3da62f0-744d-11ea-abce-1b474a67a6e2',
                JSON.stringify(data.actividades[2])
            );
            //TRUs producidos
            await stub.putState(
                'd3da62f0-744d-11ea-abce-1b474a67a6e2-0',
                JSON.stringify(data.trus[14])
            );
            await stub.putState(
                'd3da62f0-744d-11ea-abce-1b474a67a6e2-1',
                JSON.stringify(data.trus[15])
            );

            //Transformar el lote en 2 paquetes
            await stub.putState(
                '76033ce0-7454-11ea-abce-1b474a67a6e2',
                JSON.stringify(data.actividades[3])
            );
            //TRUs producidos
            await stub.putState(
                '76033ce0-7454-11ea-abce-1b474a67a6e2-0',
                JSON.stringify(data.trus[16])
            );
            await stub.putState(
                '76033ce0-7454-11ea-abce-1b474a67a6e2-1',
                JSON.stringify(data.trus[17])
            );

            //Transaccion de Cartoflex al transportador
            await stub.putState(
                'eade0610-7456-11ea-abce-1b474a67a6e2',
                JSON.stringify(data.transacciones[2])
            );

            //Transportar
            await stub.putState(
                '3668dc40-7457-11ea-abce-1b474a67a6e2',
                JSON.stringify(data.actividades[4])
            );
            //TRUs producidos
            await stub.putState(
                '3668dc40-7457-11ea-abce-1b474a67a6e2-0',
                JSON.stringify(data.trus[18])
            );
            await stub.putState(
                '3668dc40-7457-11ea-abce-1b474a67a6e2-1',
                JSON.stringify(data.trus[19])
            );

            //Transaccion de Cartoflex al Canvan
            await stub.putState(
                'cc3e4b00-7458-11ea-abce-1b474a67a6e2',
                JSON.stringify(data.transacciones[3])
            );
            return shim.success();
        } catch (err) {
            console.log('ERROR AL CARGAR LOS DATOS: ', err);
            return shim.error(err);
        }
    }
    async Invoke(stub) {
        let ret = stub.getFunctionAndParameters();
        console.info(ret);
        let method = this[ret.fcn];
        if (!method) {
            console.log('no method of name:' + ret.fcn + ' found');
            return shim.success();
        }
        try {
            let payload = await method(stub, ret.params);
            return shim.success(payload);
        } catch (err) {
            console.log(err);
            return shim.error(err);
        }
    }
    async invoke(stub, args) {
        if (args.length != 3) {
            throw new Error('Incorrect number of arguments. Expecting 3');
        }

        await stub.putState('Hi', JSON.stringify({ a: 'Hi there' }));
        let tes = await stub.getState('Hi');
        console.log(tes.toString());

        let A = args[0];
        let B = args[1];
        if (!A || !B) {
            throw new Error('asset holding must not be empty');
        }

        // Get the state from the ledger
        let Avalbytes = await stub.getState(A);
        if (!Avalbytes) {
            throw new Error('Failed to get state of asset holder A');
        }
        let Aval = parseInt(Avalbytes.toString());

        let Bvalbytes = await stub.getState(B);
        if (!Bvalbytes) {
            throw new Error('Failed to get state of asset holder B');
        }

        let Bval = parseInt(Bvalbytes.toString());
        // Perform the execution
        let amount = parseInt(args[2]);
        if (typeof amount !== 'number') {
            throw new Error(
                'Expecting integer value for amount to be transaferred'
            );
        }

        Aval = Aval - amount;
        Bval = Bval + amount;
        console.info(util.format('Aval = %d, Bval = %d\n', Aval, Bval));

        // Write the states back to the ledger
        await stub.putState(A, Buffer.from(Aval.toString()));
        await stub.putState(B, Buffer.from(Bval.toString()));
    }
    // Deletes an entity from state
    async delete(stub, args) {
        if (args.length != 1) {
            throw new Error('Incorrect number of arguments. Expecting 1');
        }

        let A = args[0];

        // Delete the key from the state in ledger
        await stub.deleteState(A);
    }
    // query callback representing the query of a chaincode
    async query(stub, args) {
        if (args.length != 1) {
            throw new Error(
                'Incorrect number of arguments. Expecting name of the person to query'
            );
        }

        let jsonResp = {};
        let A = args[0];

        // Get the state from the ledger
        let Avalbytes = await stub.getState(A);
        if (!Avalbytes) {
            jsonResp.error = 'Failed to get state for ' + A;
            throw new Error(JSON.stringify(jsonResp));
        }

        jsonResp.name = A;
        jsonResp.amount = Avalbytes.toString();
        console.info('Query Response:');
        console.info(jsonResp);
        return Avalbytes;
    }

    //args: [tru_id]
    async getTruById(stub, args) {
        let tru = await stub.getState(args[0]);
        if (tru.toString().length !== 0) {
            tru.id = args[0];
            return tru;
        } else {
            throw `El TRU ${args[0]} no existe`;
        }
    }

    //args: [sku, actor]
    async getTruBySku(stub, args) {
        let query = {
            selector: {
                SKU: { $eq: args[0] },
            },
        };
        let iterator = await stub.getQueryResult(JSON.stringify(query));
        let tru = await iterator.next();
        if (!tru.done) {
            let response = JSON.parse(tru.value.value.toString());
            response.id = tru.value.key;
            console.log(response);
            return Buffer.from(JSON.stringify(response));
        } else {
            throw `El TRU con identificado con el SKU: ${args[0]} por el actor ${args[1]} no existe`;
        }
    }

    //args: [upc]
    async getTruByUpc(stub, args) {
        let query = {
            selector: {
                UPC: { $eq: args[0] },
            },
        };
        let iterator = await stub.getQueryResult(JSON.stringify(query));
        let tru = await iterator.next();
        if (tru) {
            return tru.value.value;
        } else {
            throw `El TRU con identificado con el UPC: ${args[0]} no existe`;
        }
    }

    //[id, trus, fuente, destino, fecha]
    async crearTransaccion(stub, args) {
        let argsJson = JSON.parse(args[0]);
        let trus = argsJson[1];
        let origen = argsJson[2];
        let destino = argsJson[3];
        let trus_revisados = [];
        //revisa que los TRUs sean validos
        for (let i in trus) {
            let tru = await stub.getState(trus[i]);
            //revisar que el TRU exista
            if (tru.toString().length === 0) {
                throw `El TRU ${trus[i]} no existe`;
            }
            tru = JSON.parse(tru.toString());
            //revisar que el TRU le pertenezca al dueño

            if (tru.dueños[tru.dueños.length - 1] !== origen) {
                throw `El TRU ${trus[i]} no pertenece al actor origen. No se pueden realizar transacciones sobre TRUs que no esten bajo su custodia.`;
            }
            //revisar que el TRU no haya sido consumido
            if (tru.consumido) {
                throw `El TRU ${trus[i]} ya esta consumido. No se pueden realiza transacciones sobre TRUs ya consumidos.`;
            }
            tru.id = trus[i];
            trus_revisados.push(tru);
        }
        //actualiza el dueño de los TRUs
        for (let i in trus_revisados) {
            let key = trus_revisados[i].id;
            delete trus_revisados[i].id;
            trus_revisados[i].dueñoActual = destino;
            trus_revisados[i].dueños.push(destino);
            await stub.putState(key, JSON.stringify(trus_revisados[i]));
        }

        let transaccion = {
            trus: trus,
            fuente: argsJson[2],
            destino: destino,
            fecha: argsJson[4],
            tipo: 'TRANSACCION',
        };
        await stub.putState(argsJson[0], JSON.stringify(transaccion));
        return 'OK';
    }

    //args: [nombre, identificacion, tipo]
    async registerActor(stub, args) {
        let argsJson = JSON.parse(args[0]);
        let actor = {
            nombre: argsJson[0],
            identificacion: argsJson[1],
            tipo: argsJson[2],
        };
        await stub.putState(actor.identificacion, JSON.stringify(actor));
        return 'OK';
    }

    //args: [id, actor, ubicacion, consumidos, fecha]
    async consumir(stub, args) {
        let argsJson = JSON.parse(args[0]);
        let id_actividad = argsJson[0];
        let actor = argsJson[1];
        let ubicacion = argsJson[2];
        let p_trus_consumidos = argsJson[3];
        let fecha = argsJson[4];
        let trus_consumidos = [];
        for (let i in p_trus_consumidos) {
            let tru = await stub.getState(p_trus_consumidos[i].id);
            //revisar que el tru exista
            if (tru.toString().length !== 0) {
                tru = JSON.parse(tru.toString());
                //revisar que el ultimo dueño del tru sea el mismo actor que va a realizar la actividad
                if (tru.dueños[tru.dueños.length - 1] === actor) {
                    if (!tru.consumido) {
                        tru.consumido = true;
                        tru.consumidoPor = id_actividad;
                        trus_consumidos.push(tru);
                        stub.putState(
                            p_trus_consumidos[i].id,
                            JSON.stringify(tru)
                        );
                    } else {
                        throw `El TRU ${p_trus_consumidos[i].id} ya fue consumido`;
                    }
                } else {
                    throw `El TRU ${p_trus_consumidos[i].id} no esta bajo su custodia`;
                }
            } else {
                throw `El TRU ${p_trus_consumidos[i].id} no existe`;
            }
        }

        let actividad = {
            actor: actor,
            tipo: 'CONSUMIR',
            ubicacion: ubicacion,
            fecha: fecha,
            consume: trus_consumidos,
            produce: [],
        };
        await stub.putState(argsJson[0], JSON.stringify(actividad));
        return 'OK';
    }

    //args: [id, actor, ubicacion, trus_producidos, fecha]
    async producir(stub, args) {
        let argsJson = JSON.parse(args[0]);
        let id_actividad = argsJson[0];
        let actor = argsJson[1];
        let ubicacion = argsJson[2];
        let p_trus_producidos = argsJson[3];
        let fecha = argsJson[4];
        let trus_producidos = [];
        let ids = [];
        for (let i in p_trus_producidos) {
            let tru = { ...p_trus_producidos[i] };
            tru.tipo = 'TRU';
            tru.consumido = false;
            tru.dueñoActual = actor;
            tru.dueños = [actor];
            tru.producidoPor = id_actividad;
            tru.ubicacion = ubicacion;
            trus_producidos.push(tru);
            ids.push(id_actividad + '-' + i);
            stub.putState(id_actividad + '-' + i, JSON.stringify(tru));
        }

        let actividad = {
            tipo: 'PRODUCIR',
            fecha: fecha,
            actor: actor,
            ubicacion: ubicacion,
            consume: [],
            produce: trus_producidos,
        };
        await stub.putState(id_actividad, JSON.stringify(actividad));
        let rpta = { trus_producidos: ids };
        return rpta;
    }

    //args: [id, trus, destino, actor, fecha]
    async transportar(stub, args) {
        let argsJson = JSON.parse(args[0]);
        let id_actividad = argsJson[0];
        let trus = argsJson[1];
        let destino = argsJson[2];
        let actor = argsJson[3];
        let fecha = argsJson[4];
        let trus_consumidos = [];
        let trus_producidos = [];

        for (let i in trus) {
            let tru = await stub.getState(trus[i]);
            //revisar que el tru exista
            if (tru.toString().length !== 0) {
                tru = JSON.parse(tru.toString());
                //revisar que el ultimo dueño del tru sea el mismo actor que va a realizar la actividad
                if (tru.dueños[tru.dueños.length - 1] === actor) {
                    //revisar que el TRU no haya sido consumido
                    if (!tru.consumido) {
                        let nuevo_tru = { ...tru };
                        tru.consumido = true;
                        tru.consumidoPor = id_actividad;
                        trus_consumidos.push(tru);
                        stub.putState(trus[i], JSON.stringify(tru));
                        nuevo_tru.id = id_actividad + '-' + i;
                        nuevo_tru.ubicacion = destino;
                        trus_producidos.push(nuevo_tru);
                        stub.putState(nuevo_tru.id, JSON.stringify(nuevo_tru));
                    } else {
                        throw `El TRU ${trus[i]} ya fue consumido`;
                    }
                } else {
                    throw `El TRU ${trus[i]} no esta bajo su custodia`;
                }
            } else {
                throw `El TRU ${trus[i]} no existe`;
            }
        }

        let actividad = {
            actor: actor,
            tipo: 'TRANSPORTAR',
            destino: destino,
            fecha: fecha,
            consume: trus_consumidos,
            produce: trus_producidos,
        };
        await stub.putState(argsJson[0], JSON.stringify(actividad));
        return 'OK';
    }

    //args: [id, trus, actor, fecha]
    async invalidar(stub, args) {
        let argsJson = JSON.parse(args[0]);
        let id_actividad = argsJson[0];
        let trus_a_invalidar = argsJson[1];
        let actor = argsJson[2];
        let fecha = argsJson[3];
        let trus_listos_para_invalidar = [];
        //Revisa si todos los TRUs se pueden invalidar
        for (let i in trus_a_invalidar) {
            let tru = await stub.getState(trus_a_invalidar[i].id);
            //revisar que el tru exista
            if (tru.toString().length !== 0) {
                tru = JSON.parse(tru.toString());
                //revisar que el ultimo dueño del tru sea el mismo actor que va a realizar la actividad
                if (tru.dueños[tru.dueños.length - 1] === actor) {
                    if (!tru.consumido) {
                        tru.consumido = true;
                        tru.consumidoPor = id_actividad;
                        tru.invalidado = true;
                        tru.razon_invalizacion = trus_a_invalidar[i].id;
                        tru.certificacion_invalizacion =
                            trus_a_invalidar[i].certificacion;
                        //Valida que se cumplan las reglas especificas del dominio
                        try {
                            domain.invalidar(tru);
                            trus_listos_para_invalidar.push([
                                trus_a_invalidar[i].id,
                                tru,
                            ]);
                        } catch (err) {
                            throw err;
                        }
                    } else {
                        throw `El TRU ${trus_a_invalidar[i].id} ya fue consumido`;
                    }
                } else {
                    throw `El TRU ${trus_a_invalidar[i].id} no esta bajo su custodia`;
                }
            } else {
                throw `El TRU ${trus_a_invalidar[i].id} no existe`;
            }
        }

        //invalida los TRUs en la BD
        for (let i in trus_listos_para_invalidar) {
            stub.putState(
                trus_listos_para_invalidar[i][0],
                JSON.stringify(trus_listos_para_invalidar[i][1])
            );
        }

        // Crea la actividad en la BD
        let actividad = {
            actor: actor,
            tipo: 'INVALIDAR',
            fecha: fecha,
            consume: trus_listos_para_invalidar,
            produce: [],
        };
        await stub.putState(argsJson[0], JSON.stringify(actividad));
        return 'OK';
    }

    //args: [id, trus_consumidos, trus_producidos, actor, fecha]
    async transformar(stub, args) {
        let argsJson = JSON.parse(args[0]);
        let id_actividad = argsJson[0];
        //ids que llegan
        let trus_a_consumir = argsJson[1];
        // caracteristicas que llegan
        let trus_a_producir = argsJson[2];
        // lista de trus para poner en la actividad
        let trus_consumidos = [];
        // lista de tuplas [id, tru] para persistir en la bd
        let trus_listos_para_consumir = [];
        let actor = argsJson[3];
        let fecha = argsJson[4];
        for (let i in trus_a_consumir) {
            let tru = await stub.getState(trus_a_consumir[i]);
            //revisar que el tru exista
            if (tru.toString().length !== 0) {
                tru = JSON.parse(tru.toString());
                //revisar que el ultimo dueño del tru sea el mismo actor que va a realizar la actividad
                if (tru.dueños[tru.dueños.length - 1] === actor) {
                    if (!tru.consumido) {
                        tru.consumido = true;
                        tru.consumidoPor = id_actividad;
                        trus_consumidos.push(tru);
                        trus_listos_para_consumir.push([
                            trus_a_consumir[i],
                            tru,
                        ]);
                    } else {
                        throw `El TRU ${trus_a_consumir[i].id} ya fue consumido`;
                    }
                } else {
                    throw `El TRU ${trus_a_consumir[i].id} no esta bajo su custodia`;
                }
            } else {
                throw `El TRU ${trus_a_consumir[i].id} no existe`;
            }
        }
        //la ubicacion de los producidos sera la misma de los consumidos
        let ubicacion = trus_listos_para_consumir[0].ubicacion;
        try {
            //Verifica que se cumplan las reglas del dominio para que la transformacion tenga sentido
            domain.transformar(trus_listos_para_consumir, trus_a_producir);
            //Consume los TRUs en a BD
            for (let i in trus_listos_para_consumir) {
                stub.putState(
                    trus_listos_para_consumir[i][0],
                    JSON.stringify(trus_listos_para_consumir[i][1])
                );
            }
            //Produce los TRUs en la BD
            for (let i in trus_a_producir) {
                trus_a_producir[i].consumido = false;
                trus_a_producir[i].ubicacion = ubicacion;
                trus_a_producir[i].producidoPor = id_actividad;
                stub.putState(
                    id_actividad + '-' + i,
                    JSON.stringify(trus_a_producir[i])
                );
            }
        } catch (err) {
            throw err;
        }
        // Crea la actividad en la BD
        let actividad = {
            actor: actor,
            tipo: 'TRANSFORMAR',
            fecha: fecha,
            consume: trus_consumidos,
            produce: trus_a_producir,
        };
        await stub.putState(argsJson[0], JSON.stringify(actividad));
        return 'OK';
    }

    async origenById(stub, args) {
        let tru = await stub.getState(args[0]);
        let actividades = [];
        if (tru.toString().length !== 0) {
            tru = JSON.parse(tru.toString());
            tru.id = args[0];
            actividades = await utils.getActividadesOrigen(stub, tru);
            return Buffer.from(
                JSON.stringify({ tru: tru, actividades: actividades })
            );
        } else {
            throw `El TRU ${args[0]} no existe`;
        }
    }

    async destinoById(stub, args) {
        let tru = await stub.getState(args[0]);
        let actividades = [];
        if (tru.toString().length !== 0) {
            tru = JSON.parse(tru.toString());
            tru.id = args[0];
            actividades = await utils.getActividadesDestino(stub, tru);
            return Buffer.from(
                JSON.stringify({ tru: tru, actividades: actividades })
            );
        } else {
            throw `El TRU ${args[0]} no existe`;
        }
    }

    async origenBySku(stub, args) {
        let query = {
            selector: {
                SKU: { $eq: args[0] },
            },
        };
        let iterator = await stub.getQueryResult(JSON.stringify(query));
        let results = [];
        let next = await iterator.next();
        if (!next.done) {
            let newItem = JSON.parse(next.value.value.toString());
            newItem.id = next.value.key;
            results.push(newItem);
            while (!next.done) {
                next = await iterator.next();
                if (next.value) {
                    newItem = JSON.parse(next.value.value.toString());
                    newItem.id = next.value.key;
                    results.push(newItem);
                }
            }
            results = results.filter(
                (item) =>
                    (item.transacciones.length > 0 &&
                        item.transacciones[0].fuente === args[1]) ||
                    (item.transacciones.length === 0 &&
                        item.dueñoActual === args[1])
            );
            let tru = results[0];
            let actividades = await utils.getActividadesOrigen(stub, tru);
            return Buffer.from(
                JSON.stringify({ tru: tru, actividades: actividades })
            );
        } else {
            throw `El TRU con identificado con el SKU: ${args[0]} por el actor ${args[1]} no existe`;
        }
    }

    async destinoBySku(stub, args) {
        let query = {
            selector: {
                SKU: { $eq: args[0] },
            },
        };
        let iterator = await stub.getQueryResult(JSON.stringify(query));
        let results = [];
        let next = await iterator.next();
        if (!next.done) {
            let newItem = JSON.parse(next.value.value.toString());
            newItem.id = next.value.key;
            results.push(newItem);
            while (!next.done) {
                next = await iterator.next();
                if (next.value) {
                    newItem = JSON.parse(next.value.value.toString());
                    newItem.id = next.value.key;
                    results.push(newItem);
                }
            }
            results = results.filter(
                (item) =>
                    (item.transacciones.length > 0 &&
                        item.transacciones[0].fuente === args[1]) ||
                    (item.transacciones.length === 0 &&
                        item.dueñoActual === args[1])
            );
            let tru = results[results.length - 1];
            let actividades = await utils.getActividadesDestino(stub, tru);
            return Buffer.from(
                JSON.stringify({ tru: tru, actividades: actividades })
            );
        } else {
            throw `El TRU con identificado con el SKU: ${args[0]} por el actor ${args[1]} no existe`;
        }
    }

    async origenByUpc(stub, args) {
        let query = {
            selector: {
                UPC: { $eq: args[0] },
            },
        };
        let iterator = await stub.getQueryResult(JSON.stringify(query));
        let results = [];
        let next = await iterator.next();
        if (!next.done) {
            let newItem = JSON.parse(next.value.value.toString());
            newItem.id = next.value.key;
            results.push(newItem);
            while (!next.done) {
                next = await iterator.next();
                if (next.value) {
                    newItem = JSON.parse(next.value.value.toString());
                    newItem.id = next.value.key;
                    results.push(newItem);
                }
            }
            let tru = results[0];
            let actividades = await utils.getActividadesOrigen(stub, tru);
            return Buffer.from(
                JSON.stringify({ tru: tru, actividades: actividades })
            );
        } else {
            throw `El TRU con identificado con el SKU: ${args[0]} por el actor ${args[1]} no existe`;
        }
    }

    async destinoByUpc(stub, args) {
        let query = {
            selector: {
                UPC: { $eq: args[0] },
            },
        };
        let iterator = await stub.getQueryResult(JSON.stringify(query));
        let results = [];
        let next = await iterator.next();
        if (!next.done) {
            let newItem = JSON.parse(next.value.value.toString());
            newItem.id = next.value.key;
            results.push(newItem);
            while (!next.done) {
                next = await iterator.next();
                if (next.value) {
                    newItem = JSON.parse(next.value.value.toString());
                    newItem.id = next.value.key;
                    results.push(newItem);
                }
            }
            let tru = results[results.length - 1];
            let actividades = await utils.getActividadesOrigen(stub, tru);
            return Buffer.from(
                JSON.stringify({ tru: tru, actividades: actividades })
            );
        } else {
            throw `El TRU con identificado con el SKU: ${args[0]} por el actor ${args[1]} no existe`;
        }
    }
};

console.log('>>>>>>>>start');

shim.start(new ABstore());
