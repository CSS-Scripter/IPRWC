const { Pool, Client } = require('pg')
const {DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_URL, DATABASE_PORT} = require('../config.json')

function openPool() {
    return new Pool({
        user: DATABASE_USER,
        host: DATABASE_URL,
        database: DATABASE_NAME,
        password: DATABASE_PASSWORD,
        port: DATABASE_PORT
    })
}

module.exports = { openPool }