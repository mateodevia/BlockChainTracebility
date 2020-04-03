/* eslint-disable linebreak-style */
'use strict';

module.exports.getActividades = async (stub, tru) => {
  let actividades = [];
  let actividadAnterior = await stub.getState(tru.producidoPor);
  actividadAnterior = JSON.parse(actividadAnterior.toString());
  actividadAnterior.id = tru.producidoPor;
  if (actividadAnterior.consume.length > 0) {
    let integracion = {};
    for (let i in actividadAnterior.consume) {
      let truActual = actividadAnterior.consume[i];
      let actividadesTruActual = await this.getActividades(stub, truActual);
      let huboRepetido = false;
      for (let j = 0; j < actividadesTruActual.length && !huboRepetido; i++) {
        let actividadActual = actividadesTruActual[j];
        if (integracion[actividadActual.id]) {
          huboRepetido = true;
        }
        integracion[actividadActual.id] = actividadActual;
      }
    }
    actividades = Object.values(integracion);
  }
  actividades.push(actividadAnterior);
  return actividades;
};