const { Pool } = require('pg');

// console.log(process.env.USER);
const db = new Pool({
  user: 'postgres',
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: 'postgres',
  port: 5432,
});

db
  .connect()
  .then(() => console.log('db is connected'))
  .catch((err) => console.error('connection error', err));

module.exports.pool = db;
