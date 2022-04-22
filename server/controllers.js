const models = require('./models');
// const db = require('../database/mongodb');
module.exports = {
  getReview: (req, res) => {
    const productID = req.query.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    models.getReview(productID, (err, result) => {
      if (!result) { res.send(501); }
      const data = {};
      data.product_id = productID;
      data.page = page;
      data.count = count;
      data.results = result[0].results;
      res.send(data);
    });
  },
  getMeta: (req, res) => {
    const productID = req.query.product_id;
    models.getMeta(productID, (err, result) => {
      res.send(result[0].results);
    });
  },
  postReview: (req, res) => {
    const review = req.body;
    console.log(review);
    console.log('post a review');
    const currDate = new Date();
    const data = [
      122,
      review.product_id,
      review.rating,
      review.summary,
      review.body,
      review.email,
      review.name,
      review.recommend,
      review.helpfulness,
    ];
    models.postReview(data, req.body.photos, req.body.characteristics, (err) => {
      if (!err) {
        console.log('post a reviews successfully');
        res.status(201);
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
