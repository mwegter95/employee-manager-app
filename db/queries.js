const mysql = require('mysql2/promise');
const cTable = require('console.table');
const connection = require('./connection');


// this js file is for defining functions that will be used to query 
// mysql for information that is used in the inquirer interface

const allDepartments = async () => {
    try {
        console.log('line 10 queries')
        const [rows] = await connection.promise().query(`SELECT * FROM departments`);
        console.table(rows);
    } catch(err) {
        console.log('line 17', err)
    }
};
//     , (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// };


module.exports = allDepartments();