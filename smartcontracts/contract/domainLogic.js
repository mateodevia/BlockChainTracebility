/* eslint-disable no-throw-literal */
/* eslint-disable linebreak-style */
'use strict';

module.exports.invalidar = (tru) => {
  console.log('##### Verificando si se puede invalidar #####');
};

module.exports.transformar = (trus_consumidos, trus_producidos) => {
  //trus_consumidos es un arreglo de tuplas [id, tru]
  console.log('##### Verificando que la transformacion cumpla las reglas #####');
  let suma_consumidos = 0;
  for (let i in trus_consumidos) {
    let cantidad = parseFloat(trus_consumidos[i][1].cantidad.replace('kg', ''));
    suma_consumidos += cantidad;
  }

  let suma_producidos = 0;
  for (let i in trus_producidos) {
    let cantidad = parseFloat(trus_producidos[i].cantidad.replace('kg', ''));
    suma_producidos += cantidad;
  }

  let rendimiento = suma_producidos * 100 / suma_consumidos;

  if (rendimiento < 99) {
    throw 'No puede haber tanto desperdicio en una transformacion de plastico';
  }
  if (rendimiento > 100) {
    throw 'Los TRUs consumidos no son suficientes para producir los TRUs producidos';
  }
};
