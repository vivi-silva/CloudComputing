const { Pool } = require('pg');

const pool = new Pool({
  user: 'SEU_USUARIO',
  host: 'SEU_HOST_DO_AZURE',
  database: 'SEU_BANCO',
  password: 'SUA_SENHA',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

