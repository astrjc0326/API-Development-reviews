const db = require('../database');

module.exports = {
  getReview: async (req, res) => {
    res.send(`reviews for ${req.query.product_id}`);
  },
  getMeta: async (req, res) => {

  },
  postReview: async (req, res) => {

  },
  putReviewHelpful: async(req, res) => {

  },
  reportReview: async(req, res) => {

  },
};
