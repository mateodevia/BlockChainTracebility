import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1000,
    duration: '30s',
};
const url = 'http://192.168.50.10:3000/';

export default function () {
    let res = http.get(
        url + 'v1/api/trus/id/3668dc40-7457-11ea-abce-1b474a67a6e2-0/origen'
    );
    check(res, { 'status was 200': (r) => r.status == 200 });
}
