/* eslint-disable linebreak-style */
'use strict';

module.exports.getActividadesOrigen = async (stub, tru) => {
  let actividades = [];
  let actividadAnterior = await stub.getState(tru.producidoPor);
  actividadAnterior = JSON.parse(actividadAnterior.toString());
  actividadAnterior.id = tru.producidoPor;
  if (actividadAnterior.consume.length > 0) {
    let integracion = {};
    for (let i in actividadAnterior.consume) {
      let truActual = actividadAnterior.consume[i];
      truActual.id = truActual.producidoPor+"-"+i;
      let actividadesTruActual = await this.getActividades(stub, truActual);
      let huboRepetido = false;
      console.log("ACTIVIDADES DEL TRU: "+truActual.id);
      console.log(actividadesTruActual);
      for (let j = 0; j < actividadesTruActual.length && !huboRepetido; i++) {
 	let actividadActual = actividadesTruActual[j];
        console.log(actividadActual.id);
        if (integracion[actividadActual.id]) {
          huboRepetido = true;
        }
        integracion[actividadActual.id] = actividadActual;
      }
    }
    actividades = Object.values(integracion);
  }
  console.log("INTEGRACION", actividades);
  actividades.push(actividadAnterior);
  return actividades;
};

module.exports.getActividadesDestino = async (stub, tru) => {
  let actividades = [];
  let actividadAnterior = await stub.getState(tru.producidoPor);
  actividadAnterior = JSON.parse(actividadAnterior.toString());
  actividadAnterior.id = tru.producidoPor;
  if (actividadAnterior.consume.length > 0) {
    let integracion = {};
    for (let i in actividadAnterior.consume) {
      let truActual = actividadAnterior.consume[i];
      truActual.id = truActual.producidoPor+"-"+i;
      let actividadesTruActual = await this.getActividades(stub, truActual);
      let huboRepetido = false;
      console.log("ACTIVIDADES DEL TRU: "+truActual.id);
      console.log(actividadesTruActual);
      for (let j = 0; j < actividadesTruActual.length && !huboRepetido; i++) {
 	let actividadActual = actividadesTruActual[j];
        console.log(actividadActual.id);
        if (integracion[actividadActual.id]) {
          huboRepetido = true;
        }
        integracion[actividadActual.id] = actividadActual;
      }
    }
    actividades = Object.values(integracion);
  }
  console.log("INTEGRACION", actividades);
  actividades.push(actividadAnterior);
  return actividades;
};