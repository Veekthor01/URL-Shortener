const { Pool } = require('pg');
require('dotenv').config();

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});

module.exports = pool;