const supertest = require('supertest');
const app = require('../server/server').createServer();

describe('reviews', () => {
  const productID=1;
  describe('get reviews route', () => {
    describe('given the product exists', () => {
      it ('should return a 200', async () => {
      const { statusCode } = await supertest(app).get(`/reviews?product_id=${productID}`);

      expect(statusCode).toBe(200);
      })
    })
  });
})

describe('product review meta', () => {
  const productID=1;
  describe('get reviews meta route', () => {
    describe('given the product exsits', () => {
      it ('should return a 200', async () => {
      const { statusCode } = await supertest(app).get(`/reviews/meta?product_id=${productID}`);
      expect(statusCode).toBe(200);
      })
    })
  });
})

