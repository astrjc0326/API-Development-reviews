require('dotenv').config();
const express = require('express');
const model = require('./model');

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.static('client/dist'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});
app.get('/reviews', model.getReview);
app.get('/reviews/meta', model.getMeta);
app.post('/reviews', model.postReview);
app.put('/reviews/:review_id/helpful', model.putReviewHelpful);
app.put('reviews/:review_id/report', model.reportReview);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
