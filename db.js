const { Pool } = require('pg');

const pool = new Pool({
  user: 'adminpucpr',
  host: 'bdmatricula27749.postgres.database.azure.com',
  database: 'postgres',
  password: 'SenhaForte123!',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

