const mysql = require('mysql2');


//Connect to database with promise form using await
const connection = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'root',
    database: 'employee_db'
});

console.log('Connected to the employee database.');

module.exports = connection;
