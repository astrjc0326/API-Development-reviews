require('dotenv').config();
const express = require('express');

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.static('client/dist'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});
app.get('/reviews', (req, res) => {
  res.send(`reviews for ${req.query.product_id}`);
});
app.get('/reviews/meta');
app.post('/reviews');

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
