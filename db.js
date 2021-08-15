const mysql = require('mysql2/promise')

/*
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'cat-products'
})
*/

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'cat-products',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = conn