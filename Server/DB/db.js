const { Pool } = require('pg');
require('dotenv').config();

const username = process.env.DB_USERNAME;
const host = process.env.DB_HOST;
const PGDatabase = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const ENDPOINT_ID = process.env.ENDPOINT_ID;

const database = decodeURIComponent(PGDatabase); // Decode the database URI

// Create a new connection pool (Neon.tech)
const pool = new Pool({
    username: username,
    host: host,
    database: database,
    password: password,
    port: port,
    ssl: 'require', // This is for production only
    connection: {
        options: `project=${ENDPOINT_ID}`,
      },
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