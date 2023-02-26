const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.HOST | 'localhost',
    user: process.env.USER | 'root',
    password: process.env.PASSWORD | 'password',
    database: process.env.DATABASE | 'mco1'
})

db.connect(function(err) {
    if (err) throw err;
    console.log("MySQL Connected!");
});

module.exports = db;