const { Pool } = require('pg');

const db = new Pool({
  user: 'annywang',
  host: process.env.HOST,
  password: '',
  database: 'review',
  port: 5433,
});

db
  .connect()
  .then(() => console.log('db is connected'))
  .catch((err) => console.error('connection error', err));

module.exports.pool = db;
