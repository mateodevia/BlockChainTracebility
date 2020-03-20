/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

const shim = require('fabric-shim');
const util = require('util');

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
    tru.id = args[0];
    return tru;
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
      tru = tru.toString();
      //revisar que el tru exista
      //revisar que el ultimo dueño del tru sea el mismo actor que va a realizar la actividad
      console.log("El TRU!!!", tru);
      if (tru && tru.dueños[tru.dueños.length - 1] === actor) {
        tru.consumido = true;
        tru.consumidoPor = id_actividad;
        trus_consumidos.push(tru);
        stub.putState(tru.id, JSON.stringify(tru));
      }
      else {
        throw `El TRU ${p_trus_consumidos[i].id} no existe`;
      }
    }

    let actividad = {
      actor: actor,
      tipo: "CONSUMIR",
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
    for (let i in p_trus_producidos) {
      let tru = { ...p_trus_producidos[i] };
      tru.tipo = "TRU";
      tru.consumido = false;
      tru.dueños = [actor];
      tru.producidoPor = id_actividad;
      trus_producidos.push(tru);
      stub.putState(id_actividad + "-" + i, JSON.stringify(tru));
    }

    let actividad = {
      tipo: "CONSUMIR",
      fecha: fecha,
      actor: actor,
      ubicacion: ubicacion,
      consume: [],
      produce: trus_producidos
    }
    await stub.putState(id_actividad, JSON.stringify(actividad));
    return "OK";
  }

  //[trus, fuente, destino]
  async crearTransaccion(stub, args) {
    trus = args[0];
    trusIds = trus.map(tru => tru.id);
    let transaccion = {
      trus: trusIds,
      fuente: [1],
      destino: [2]
    }
    await stub.putState(transaccion.identificacion, JSON.stringify(transaccion));
    return "OK"
  }
};

console.log('>>>>>>>>start');

shim.start(new ABstore());
