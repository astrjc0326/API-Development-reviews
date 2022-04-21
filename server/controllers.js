const models = require('./models');
// const db = require('../database/mongodb');
module.exports = {
  getReview: (req, res) => {
    const productID = req.query.product_id;
    models.getReview(productID, (err, result) => {
      res.send(result);
    });
  },
  getMeta: (req, res) => {
    const productID = req.query.product_id;
    models.getMeta(productID, (err, result) => {
      res.send(result);
    });
  },
  postReview: (req, res) => {
    const review = req.body;
    console.log(review);
    console.log('post a review');
    const currDate = new Date();
    const data = [
      currDate,
      review.product_id,
      review.rating,
      review.summary,
      review.body,
      review.email,
      review.name,
      review.recommend,
      review.helpfulness,
    ];
    models.postReview(data, (err) => {
      if (!err) {
        console.log('post a reviews successfully');
        res.sendStatus(201);
      }
    });
  },
  putReviewHelpful: (req, res) => {
    res.send('put a review helpful');
  },
  reportReview: async (req, res) => {
    res.send('report a reviews');
  },
};
