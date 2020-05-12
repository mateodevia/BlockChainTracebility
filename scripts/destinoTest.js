import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 100,
    duration: '30s',
};
const url = 'http://192.168.50.10:3000/';

export default function () {
    let res = http.get(
        url + 'v1/api/trus/id/efa91e20-7413-11ea-9fdf-2174e1b0eb66-0/destino'
    );
    check(res, { 'status was 200': (r) => r.status == 200 });
}
