const router = require('express').Router();
const controllers = require('./controllers');

router.get('/reviews', controllers.getReview);
router.get('/reviews/meta', controllers.getMeta);
router.post('/reviews', controllers.postReview);
router.put('/reviews/:review_id/helpful', controllers.putReviewHelpful);
router.put('/reviews/:review_id/report', controllers.reportReview);

module.exports = router;
