const Pool = require('pg').Pool;
require('dotenv').config()

/*
lokalni konfigurace database
pokud chcete zprovoznit vytvorte .env file
v .env file promeny prostredi
*/
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});


module.exports = pool;