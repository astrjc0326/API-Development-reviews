const db = require('../database');

module.exports = {
  getReview: async (req, res) => {
    res.send(`reviews for ${req.query.product_id}`);
  },
  getMeta: async (req, res) => {
    res.send(`reviews meta for ${req.query.product_id}`);
  },
  postReview: async (req, res) => {
    res.send(`post a review for productID: ${req.body.product_id}`);
  },
  putReviewHelpful: async (req, res) => {
    res.send('put a review helpful');
  },
  reportReview: async (req, res) => {
    res.send('report a reviews');
  },
};
