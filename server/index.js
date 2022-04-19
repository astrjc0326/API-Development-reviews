const express = require('express');

const app = express();

const router = require('./routes');

const PORT = 3000 || env.process.PORT;

app.use(express.static('client/dist'));
app.use(express.json());
// app.use('', router);

app.get('', (req, res) => {
  res.send('hello world')
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})