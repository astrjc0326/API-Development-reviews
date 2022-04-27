const { Pool } = require('pg');

const db = new Pool({
  user: 'ubuntu',
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: 'review',
  port: 5432,
});

db
  .connect()
  .then(() => console.log('db is connected'))
  .catch((err) => console.error('connection error', err));

module.exports.pool = db;
