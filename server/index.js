require('dotenv').config();
const app = require('./server').createServer();

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
