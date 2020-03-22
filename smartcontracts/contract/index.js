/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/
/* eslint-disable linebreak-style */
'use strict';

const shim = require('fabric-shim');
const util = require('util');
const domain = require('./domainLogic')

var ABstore = class {

  // Initialize the chaincode
  async Init(stub) {
    console.info('========= ABstore Init =========');
    let ret = stub.getFunctionAndParameters();
    console.info(ret);
    let args = ret.params;
    // initialise only if 4 parameters passed.
    if (args.length != 4) {
      return shim.error('Incorrect number of arguments. Expecting 4');
    }

    let A = args[0];
    let B = args[2];
    let Aval = args[1];
    let Bval = args[3];

    if (typeof parseInt(Aval) !== 'number' || typeof parseInt(Bval) !== 'number') {
      return shim.error('Expecting integer value for asset holding');
    }

    try {
      await stub.putState(A, Buffer.from(Aval));
      try {
        await stub.putState(B, Buffer.from(Bval));
        return shim.success();
      } catch (err) {
        return shim.error(err);
      }
    } catch (err) {
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

    await stub.putState("Hi", JSON.stringify({ a: "Hi there" }));
    let tes = await stub.getState("Hi");
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
      throw new Error('Expecting integer value for amount to be transaferred');
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
      throw new Error('Incorrect number of arguments. Expecting name of the person to query')
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
    }
    else {
      throw `El TRU ${args[0]} no existe`;
    }
  }

  //args: [sku]
  async getTruBySku(stub, args) {
    let query = {
      selector: {
        sku: { $eq: args[0] },
        actor: { $eq: args[1] }
      }
    }
    let tru = await stub.getQueryResult(JSON.stringify(query));
    console.log(tru);
    return tru;
  }

  //args: [upc]
  async getTruByUpc(stub, args) {
    let query = {
      selector: {
        upc: { $eq: args[0] }
      }
    }
    let tru = await stub.getQueryResult(JSON.stringify(query));
    console.log(tru);
    return tru;
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
      console.log("DUEÑO: ", tru.dueños[tru.dueños.length - 1], "ORIGEN: ", origen);

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
      trus_revisados[i].dueños.push(destino);
      await stub.putState(key, JSON.stringify(trus_revisados[i]));
    }

    let transaccion = {
      trus: trus,
      fuente: argsJson[2],
      destino: destino,
      fecha: argsJson[4],
      tipo: "TRANSACCION"
    }
    await stub.putState(argsJson[0], JSON.stringify(transaccion));
    return "OK"
  }

  //args: [nombre, identificacion, tipo]
  async registerActor(stub, args) {
    let argsJson = JSON.parse(args[0]);
    let actor = {
      nombre: argsJson[0],
      identificacion: argsJson[1],
      tipo: argsJson[2]
    };
    await stub.putState(actor.identificacion, JSON.stringify(actor));
    return "OK";
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
            stub.putState(p_trus_consumidos[i].id, JSON.stringify(tru));
          }
          else {
            throw `El TRU ${p_trus_consumidos[i].id} ya fue consumido`;
          }
        }
        else {
          throw `El TRU ${p_trus_consumidos[i].id} no esta bajo su custodia`;
        }
      }
      else {
        throw `El TRU ${p_trus_consumidos[i].id} no existe`;
      }
    }

    let actividad = {
      actor: actor,
      tipo: "CONSUMIR",
      ubicacion: ubicacion,
      fecha: fecha,
      consume: trus_consumidos,
      produce: []
    };
    await stub.putState(argsJson[0], JSON.stringify(actividad));
    return "OK";
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
      tru.tipo = "TRU";
      tru.consumido = false;
      tru.dueños = [actor];
      tru.producidoPor = id_actividad;
      tru.ubicacion = ubicacion;
      trus_producidos.push(tru);
      ids.push(id_actividad + "-" + i)
      stub.putState(id_actividad + "-" + i, JSON.stringify(tru));
    }

    let actividad = {
      tipo: "PRODUCIR",
      fecha: fecha,
      actor: actor,
      ubicacion: ubicacion,
      consume: [],
      produce: trus_producidos
    }
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
            let nuevo_tru = { ...tru }
            tru.consumido = true;
            tru.consumidoPor = id_actividad;
            trus_consumidos.push(tru);
            stub.putState(trus[i], JSON.stringify(tru));
            nuevo_tru.id = id_actividad + '-' + i;
            nuevo_tru.ubicacion = destino;
            trus_producidos.push(nuevo_tru);
            stub.putState(nuevo_tru.id, JSON.stringify(nuevo_tru));
          }
          else {
            throw `El TRU ${trus[i]} ya fue consumido`;
          }
        }
        else {
          throw `El TRU ${trus[i]} no esta bajo su custodia`;
        }
      }
      else {
        throw `El TRU ${trus[i]} no existe`;
      }
    }

    let actividad = {
      actor: actor,
      tipo: "TRANSPORTAR",
      destino: destino,
      fecha: fecha,
      consume: trus_consumidos,
      produce: trus_producidos
    };
    await stub.putState(argsJson[0], JSON.stringify(actividad));
    return "OK";
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
            tru.certificacion_invalizacion = trus_a_invalidar[i].certificacion;
            //Valida que se cumplan las reglas especificas del dominio
            try {
              domain.invalidar(tru);
              trus_listos_para_invalidar.push([trus_a_invalidar[i].id, tru]);
            }
            catch (err) {
              throw err;
            }
          }
          else {
            throw `El TRU ${trus_a_invalidar[i].id} ya fue consumido`;
          }
        }
        else {
          throw `El TRU ${trus_a_invalidar[i].id} no esta bajo su custodia`;
        }
      }
      else {
        throw `El TRU ${trus_a_invalidar[i].id} no existe`;
      }
    }

    //invalida los TRUs en la BD
    for (let i in trus_listos_para_invalidar) {
      stub.putState(trus_listos_para_invalidar[i][0], JSON.stringify(trus_listos_para_invalidar[i][1]));
    }

    // Crea la actividad en la BD
    let actividad = {
      actor: actor,
      tipo: "INVALIDAR",
      fecha: fecha,
      consume: trus_listos_para_invalidar,
      produce: []
    };
    await stub.putState(argsJson[0], JSON.stringify(actividad));
    return "OK";
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
            trus_consumidos.push(tru)
            trus_listos_para_consumir.push([trus_a_consumir[i], tru]);
          }
          else {
            throw `El TRU ${trus_a_consumir[i].id} ya fue consumido`;
          }
        }
        else {
          throw `El TRU ${trus_a_consumir[i].id} no esta bajo su custodia`;
        }
      }
      else {
        throw `El TRU ${trus_a_consumir[i].id} no existe`;
      }
    }
    //la ubicacion de los producidos sera la misma de los consumidos
    let ubicacion = trus_listos_para_consumir[0].ubicacion
    try {
      //Verifica que se cumplan las reglas del dominio para que la transformacion tenga sentido
      domain.transformar(trus_listos_para_consumir, trus_a_producir);
      //Consume los TRUs en a BD
      for (let i in trus_listos_para_consumir) {
        stub.putState(trus_listos_para_consumir[i][0], JSON.stringify(trus_listos_para_consumir[i][1]));
      }
      //Produce los TRUs en la BD
      for (let i in trus_a_producir) {
        trus_a_producir[i].consumido = false;
        trus_a_producir[i].ubicacion = ubicacion;
        trus_a_producir[i].producidoPor = id_actividad;
        stub.putState(id_actividad + '-' + i, JSON.stringify(trus_a_producir[i]));
      }
    }
    catch (err) {
      throw err;
    }
    // Crea la actividad en la BD
    let actividad = {
      actor: actor,
      tipo: "TRANSFORMAR",
      fecha: fecha,
      consume: trus_consumidos,
      produce: trus_a_producir
    };
    await stub.putState(argsJson[0], JSON.stringify(actividad));
    return "OK";
  }
};

console.log('>>>>>>>>start');

shim.start(new ABstore());
