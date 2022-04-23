/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  InsercureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '1s', target: 1 },
    { duration: '1s', target: 10 },
    { duration: '1s', target: 100 },
    { duration: '1s', target: 1000 },
  ],
};

const API = 'http://localhost:3000/reviews';

export default () => {
  http.batch([
    ['GET', `${API}?product_id=1`],
    ['GET', `${API}/meta?product_id=1`],
  ]);
  sleep(1);
};
