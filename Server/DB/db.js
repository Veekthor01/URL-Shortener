const { Pool } = require('pg');
require('dotenv').config();

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

// Create a new connection pool
const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});

// Log successful connection
pool.on('connect', () => {
    console.log('Database pool connected');
});

// Handle connection errors
pool.on('error', (err, client) => {
    console.error('Database pool error:', err);
    process.exit(-1);
  });

module.exports = pool;