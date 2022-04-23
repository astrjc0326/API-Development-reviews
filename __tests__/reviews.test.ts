import { time } from "console";
import { stat } from "fs";

const supertest = require('supertest');
const db = require('../db');
const app = require('../server/server').createServer();

describe('get reviews route', () => {
  const productID=1;
  describe('given the product exists', () => {
    it ('should return a 200', async () => {
    const { statusCode } = await supertest(app).get(`/reviews?product_id=${productID}`);
    expect(statusCode).toBe(200);
    })
  })
  describe('given the product that does not exist', () => {
    it('should return 501', async () => {
      const { statusCode } = await supertest(app).get(`/reviews?product_id=a`);
      expect(statusCode).toBe(501);
    })
  })
});


describe('product review meta', () => {
  const productID=1;
  describe('get reviews meta route', () => {
    describe('given the product exsits', () => {
      it ('should return a 200', async () => {
      const { statusCode } = await supertest(app).get(`/reviews/meta?product_id=${productID}`);
      expect(statusCode).toBe(200);
      })
    })
    describe('give the productID that does not exsit', () => {
      it('should returna a 501', async () => {
        const { statusCode } = await supertest(app).get('/reviews/meta?product_id=a');
        expect(statusCode).toBe(501);
      })
    } )
  });
})

describe('post a review', () => {
  describe('post review route', () => {
    const data = {
      product_id: 1,
      rating: 5,
      summary: "This is a really characteristics test",
      body: "I love this. It is way better than I think.",
      recommend: true,
      name: "codered",
      email: "codered@gmail.com",
      photos: ["https://vignette.wikia.nocookie.net/mountaindew/images/0/06/CodeRedLogo.png/revision/latest?cb=20200728214340"],
      characteristics: {"1": 2, "2": 2, "3":3, "4":4}
    };
    let reviews = [];
    it('should return a 201', async () => {
      const result = await db.pool.query('SELECT * FROM reviews WHERE product_id=1');
      reviews = result.rows[0]
      console.log(reviews);
      const { statusCode } = await supertest(app).post(`/reviews`).send(data);
      expect(statusCode).toBe(201);
    })
    it('the review should be inserted in the database with the right product id', async () => {
      const result = await db.pool.query('SELECT product_id FROM reviews WHERE id=(SELECT count(id) FROM reviews)')
      const review_product_id = result.rows[0].product_id;
      expect(review_product_id).toBe(1);
    })
    it('the review should be inserted in the database with the right rating', async () => {
      const result = await db.pool.query('SELECT rating FROM reviews WHERE id=(SELECT count(id) FROM reviews)')
      const rating = result.rows[0].rating;

      expect(rating).toBe(5)
    })
  })
})

describe('mark a reviews helpful', () => {
  const reviewID=1;
  describe('get mark-review-helpful route', () => {
    describe('mark a review helpful', () => {
      it('should return a 204', async () => {
        const { statusCode } = await supertest(app).put(`/reviews/${reviewID}/helpful`);
        expect(statusCode).toBe(204);
      })
      it('the helpfulness should increase', async () => {
        const query = `
        SELECT helpfulness FROM reviews WHERE id=${reviewID}
        `
        const result1 = await db.pool.query(query);
        const helpfulness = result1.rows[0].helpfulness
        const { statusCode } = await supertest(app).put(`/reviews/${reviewID}/helpful`);
        const result2 = await db.pool.query(query);
        const curHelpfulness = result2.rows[0].helpfulness

        expect(curHelpfulness-helpfulness).toBe(1);
      })
    }),
    describe('if the product does not exist', () => {
      it ('should return 501', async () => {
        const { statusCode } = await supertest(app).get(`/reviews?product_id=a`)
        expect(statusCode).toBe(501)
      })
    })
  })
})

describe('report a reviews', () => {
  describe('review report route', () => {
    describe('report a review', () => {
      const reviewID=1;

      it('should return 204', async () => {
        const { statusCode } = await supertest(app).put(`/reviews/${reviewID}/report`)
        expect(statusCode).toBe(204);

      })
      it ('should mark reported true', async() => {
        const query1 = `SELECT reported FROM reviews WHERE id=${reviewID}`
        const result = await db.pool.query(query1)
        const reported = result.rows[0].reported;
        expect(reported).toBe(true);
        const query2 = `UPDATE reviews SET reported=false WHERE id=${reviewID}`
        await db.pool.query(query1)
      })
    })
    describe('if the review does not exist', () => {
      it ('should return 501', async () => {
        const { statusCode } = await supertest(app).get(`/reviews?product_id=a`)
        expect(statusCode).toBe(501)
      })
    })
  })
})