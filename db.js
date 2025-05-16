const { Pool } = require('pg');

const pool = new Pool({
  user: "labber",
  host: "localhost",
  database: "customers",
  password: "labber",
  port: 5432,
});

module.exports = pool;
