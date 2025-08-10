// backend/db.js

require('dotenv').config();
const { Pool } = require('pg');

// Creamos un objeto de configuración vacío
let config;

// La variable NODE_ENV es un estándar. Render la establecerá automáticamente como 'production'.
if (process.env.NODE_ENV === 'production') {
  // Estamos en producción (en Render)
  console.log('Running in production mode, using DATABASE_URL');
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Requerido por Render para conexiones externas
    }
  };
} else {
  // Estamos en desarrollo (en tu Mac)
  console.log('Running in development mode, using local .env variables');
  config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  };
}

// Creamos el pool de conexiones usando la configuración que hemos determinado
const pool = new Pool(config);

module.exports = pool;