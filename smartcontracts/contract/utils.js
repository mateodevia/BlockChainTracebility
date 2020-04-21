/* eslint-disable linebreak-style */
"use strict";

module.exports.getActividadesOrigen = async (stub, tru) => {
  let actividades = [];
  let actividadAnterior = await stub.getState(tru.producidoPor);
  actividadAnterior = JSON.parse(actividadAnterior.toString());
  actividadAnterior.id = tru.producidoPor;
  if (actividadAnterior.consume.length > 0) {
    let integracion = {};
    for (let i in actividadAnterior.consume) {
      let truActual = actividadAnterior.consume[i];
      truActual.id = truActual.producidoPor + "-" + i;
      let actividadesTruActual = await this.getActividadesOrigen(
        stub,
        truActual
      );
      let huboRepetido = false;
      for (let j = 0; j < actividadesTruActual.length && !huboRepetido; j++) {
        let actividadActual = actividadesTruActual[j];
        if (integracion[actividadActual.id]) {
          huboRepetido = true;
        }
        integracion[actividadActual.id] = actividadActual;
      }
    }
    for (let i in actividadAnterior.produce) {
      let truActual = actividadAnterior.produce[i];
      truActual.id = truActual.producidoPor + "-" + i;
    }
    actividades = Object.values(integracion);
  }
  actividades.push(actividadAnterior);
  return actividades;
};

module.exports.getActividadesDestino = async (stub, tru) => {
  let actividades = [];
  let actividadSiguiente = await stub.getState(tru.consumidoPor);
  actividadSiguiente = JSON.parse(actividadSiguiente.toString());
  actividadSiguiente.id = tru.consumidoPor;
  if (actividadSiguiente.produce.length > 0) {
    let integracion = {};
    for (let i in actividadSiguiente.produce) {
      let truActual = actividadSiguiente.produce[i];
      truActual.id = truActual.producidoPor + "-" + i;
      if (truActual.consumido) {
        let actividadesTruActual = await this.getActividadesDestino(
          stub,
          truActual
        );
        let huboRepetido = false;
        for (let j = 0; j < actividadesTruActual.length && !huboRepetido; j++) {
          let actividadActual = actividadesTruActual[j];
          if (integracion[actividadActual.id]) {
            huboRepetido = true;
          }
          integracion[actividadActual.id] = actividadActual;
        }
      }
    }
    actividades = Object.values(integracion);
  }
  actividades.push(actividadSiguiente);
  return actividades;
};
