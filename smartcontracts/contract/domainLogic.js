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
    let cantidad = parseInt(trus_consumidos[i][1].cantidad.replace('kg', ''));
    suma_consumidos += cantidad;
  }

  let suma_producidos = 0;
  for (let i in trus_producidos) {
    let cantidad = parseInt(trus_consumidos[i].cantidad.replace('kg', ''));
    suma_producidos += cantidad;
  }
  console.log('consumidos', suma_consumidos);
  console.log('producidos', suma_producidos);

};