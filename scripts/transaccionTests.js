import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10,
    duration: '30s',
};
const url = 'http://192.168.50.10:3000/';

let trusAProducir = [];
let bultosAlMes = 126;

for (let i = 0; i < bultosAlMes; i++) {
    trusAProducir.push({
        SKU: '12345',
        caracteristicas: {
            nombre: 'Polipropileno',
            indice: '98%',
            cantidad: '25kg',
        },
    });
}

export default function () {
    let payload = JSON.stringify({
        actor: 'Propilco',
        trus: trusAProducir,
        ubicacion: {
            lat: 10.3280074,
            lon: -75.5010829,
        },
    });
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res1 = http.post(url + 'v1/api/actividad/producir', payload, params);

    let trusProducidos = res1.trus_producidos;

    let payload2 = JSON.stringify({
        fuente: 'Propilco',
        destino: 'Cartoflex',
        fecha: new Date().toISOString(),
        trus: trusProducidos,
    });

    let res2 = http.post(url + 'v1/api/transaccion', payload2, params);

    check(res2, { 'status was 200': (r) => r.status == 200 });
}
