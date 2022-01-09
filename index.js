const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2/promise');
const connection = require('./db/connection');
// const { allDepartments } = require('./db/queries');
// console.log('line 14', allDepartments);




async function runApplication() {
    try {
        const mysql = require('mysql2/promise');
        const connection = require('./db/connection');
  
        const userSelection = await inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "Update an Employee Manager",
            ]
        });

        switch (userSelection.action) {
        case "View All Departments":
            await allDepartments();
            break;

        case "View All Roles":
            viewRoles();
            break;
            
        case "View All Employees":
            allEmployees();
            break;
            
        case "View All Employees by Department":
            employeesDept();
            break;
            
        case "View All Employees by Manager":
            employeesMgr();
            break;
                        
        case "Add a Department":
            addDepartment();
            break;

        case "Add a Role":
            addRole();
            break;

        case "Add an Employee":
            addEmployee();
            break;

        case "Update an Employee Role":
            updateRole();
            break;

        case "Update an Employee Manager":
            updateEmployeeManager();
            break;

        };
    } catch(error) {
        console.log(error)
    };
};

const allDepartments = async () => {
    try {
        console.log('line 10 queries')
        const [rows] = await connection.promise().query(`SELECT * FROM departments`);
        console.table(rows);
    } catch(err) {
        console.log('line 88', err)
    }
};


runApplication();