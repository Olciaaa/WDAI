const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'mysql.agh.edu.pl',
    user: 'aposkro1',
    password: '***',
    database: 'aposkro1'
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MySQL Database!");
    }
});

module.exports = connection;
