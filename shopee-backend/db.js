// backend/db.js

const { Pool } = require('pg');

// Es recomendable usar variables de entorno para datos sensibles
// pero para este ejemplo, lo pondremos directamente.
const pool = new Pool({
  user: 'shopee_admin', // Tu nombre de usuario de PostgreSQL
  host: '127.0.0.1',
  database: 'perfumes', // El nombre de tu base de datos
  password: 'sh0p332025',    // La contraseña de tu usuario
  port: 5432,
});

module.exports = pool;