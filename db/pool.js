//pool.js
require('dotenv').config();
const { Pool } = require('pg');
const { connectionString } = require('pg/lib/defaults');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test DB connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB connection test error:', err);
  } else {
    console.log('DB connection test successful:', res.rows[0]);
  }
});

module.exports = pool;
