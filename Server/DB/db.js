const postgres = require('postgres');
require('dotenv').config();

const username = process.env.DB_USERNAME;
const host = process.env.DB_HOST;
const PGDatabase = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const ENDPOINT_ID = process.env.ENDPOINT_ID;

const database = decodeURIComponent(PGDatabase); // Decode the database URI

// Create connection to database (Neon.tech)
const sql = postgres({
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

async function getPgVersion() {
  const result = await sql`SELECT version()`;
  console.log(result);
}

getPgVersion();

module.exports = sql;