const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cesiliciousql',
  password: 'admin',
  port: 5433
});

module.exports = pool;