const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

function runApplication() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add an Employee",
                "Update an Employee Role",
                "Update an Employee Manager",
                "Add a Role",
                "View All Roles",
                "Add a Department",
                "View All Departments"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    allEmployees();
                    break;

                case "View All Employees by Department":
                    employeesDept();
                    break;

                case "View All Employees by Manager":
                    employeesMgr();
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

                case "Add a Role":
                    addRole();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;

                case "View All Departments":
                    viewDepartments();
                    break;
            }
        });
}

runApplication();