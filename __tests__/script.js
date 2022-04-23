/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  InsercureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 1,
  duration: '10s',
};

export default () => {
  http.get('http://localhost:3000/reviews?product_id=1');
  sleep(1);
};
