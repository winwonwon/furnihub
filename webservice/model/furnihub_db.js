const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const database = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

database.connect(function (err) {
    if (err) 
        throw err;

    console.log(`Connected DB: ${process.env.MYSQL_DATABASE}`);
});

module.exports = database;