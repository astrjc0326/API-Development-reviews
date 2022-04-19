const { Pool } = require('pg');

const db = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: 'review',
  port: 5432,
});

Pool
  .connect()
  .then(() => console.log('db is connected'))
  .catch((err) => console.error('connection error', err));

module.exports.pool = db;
