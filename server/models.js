const db = require('../db');
// const db = require('../database/mongodb');
module.exports = {
  getReview: (productID, callback) => {
    const query = `
    SELECT id, date, rating, summary, body, reviewer_name, recommend, helpfulness, response FROM reviews WHERE product_id = $1
    `;
    db.pool.query(query, [productID], (err, result) => {
      console.log(result);
      callback(null, result.rows);
      console.log(err);
    });
  },
  getMeta: (productID, callback) => {
    const query = `
    SELECT * FROM meta WHERE product_id = $1
    `;
    db.pool.query(query, [productID], (err, result) => {
      if (!err) {
        callback(null, result);
      }
    });
  },
  postReview: (review, callback) => {
    const query = 'INSERT INTO reviews (review_date, product_id, rating, summary, body, reviewer_email, reviewer_name, recommend, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
    db.pool.query(query, review, (err, result) => {
      if (!err) {
        callback(null, result);
      } else {
        console.log(err);
      }
    });
    /* insert into reviews (review_date, product_id, rating, summary, body,
    reviewer_email, reviewer_name, recommend, reported, helpfulness, response) values
    ('2008-11-11', 1, 5, 'apple', 'apple',
    'apple', 'apple', true, false, 0, 'apple'); */
  },
  putReviewHelpful: (req, res) => {
    res.send('put a review helpful');
  },
  reportReview: (req, res) => {
    res.send('report a reviews');
  },
};
