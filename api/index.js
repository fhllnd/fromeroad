const mysql = require('mysql2');

const db = mysql.createConnection({
    // host: "118.210.42.214",
    host: "localhost",
    port: 3306,
    user: "fromeroadadmin",
    password: "Sp3ndin*minEcraft+gBo0ted2-WisTfuL8",
    database: "fromeroad",
    multipleStatements: true
});
module.exports = db;