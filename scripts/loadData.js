const fetch = require('node-fetch');
const fs = require('fs');
const { v1 } = require('uuid');

const url = 'http://localhost:3000';

let trusAProducir = [];

let bultosAlMes = 126;
let paquetesAlDia = 35;

for (let i = 0; i < bultosAlMes; i++) {
    trusAProducir.push({
        SKU: v1(),
        caracteristicas: {
            nombre: 'Polipropileno',
            indice: '98%',
            cantidad: '25kg',
        },
    });
}

//Crea actividad de Producir
fetch(url + '/v1/api/actividad/producir', {
    method: 'POST',
    body: JSON.stringify({
        actor: 'Propilco',
        trus: trusAProducir,
        ubicacion: {
            lat: 10.3280074,
            lon: -75.5010829,
        },
    }),
    headers: {
        'Content-Type': 'application/json',
    },
}).then(async (response) => {
    let trusProducidos = (await response.json()).trus_producidos;
    console.log('PRODUCIR:', trusProducidos[0]);

    //Crea Transacción entre Propilco y Cartoflex
    let transaccion = await fetch(url + '/v1/api/transaccion', {
        method: 'POST',
        body: JSON.stringify({
            fuente: 'Propilco',
            destino: 'Cartoflex',
            fecha: new Date().toISOString(),
            trus: trusProducidos,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let skuLote = v1();

    //Produce un lote de  laminas a partir de los bultos
    let transformacionLote = await fetch(
        url + '/v1/api/actividad/transformar',
        {
            method: 'POST',
            body: JSON.stringify({
                actor: 'Cartoflex',
                trus_consumidos: trusProducidos,
                trus_producidos: [
                    {
                        SKU: skuLote,
                        caracteristicas: {
                            cantidad: `${bultosAlMes * 25}kg`,
                            cantidadLaminas: '1050',
                            estruzor: 'Juan Perez',
                            maquina: 'Maquina 1',
                        },
                    },
                ],
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    transformacionLote = await transformacionLote.json();

    let paqueteAnterior = transformacionLote.produce[0];
    console.log('TRANSFORMAR 1:', paqueteAnterior.producidoPor);

    //3150 - (3*35)
    let polipropilenoRestante = `${bultosAlMes * 25 - 3 * paquetesAlDia}kg`;

    //Genera los despachos para cada día del mes
    for (let i = 0; i < 30; i++) {
        let paquetesAProducir = [
            {
                SKU: skuLote,
                caracteristicas: {
                    cantidad: polipropilenoRestante,
                    cantidadLaminas: '1050',
                    estruzor: 'Juan Perez',
                    maquina: 'Maquina 1',
                },
            },
        ];

        for (let i = 0; i < paquetesAlDia; i++) {
            paquetesAProducir.push({
                SKU: v1(),
                UPC: v1(),
                caracteristicas: {
                    cantidad: '3kg',
                    client: 'MABE',
                    dimension: '558*1454',
                    producto: 'PANEL ANDROMEDA 300 L VENTANA',
                    referencia: '294D1747P003',
                },
            });
        }

        let transformacionDiaria = await fetch(
            url + '/v1/api/actividad/transformar',
            {
                method: 'POST',
                body: JSON.stringify({
                    actor: 'Cartoflex',
                    trus_consumidos: [paqueteAnterior.producidoPor + '-0'],
                    trus_producidos: paquetesAProducir,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        transformacionDiaria = await transformacionDiaria.json();
        paqueteAnterior = transformacionDiaria.produce[0];
        console.log(`TRANSFORMAR ${i + 2}:`, paqueteAnterior.producidoPor);
        polipropilenoRestante =
            parseInt(polipropilenoRestante.replace('kg', '')) -
            3 * paquetesAlDia +
            'kg';
    }
});
