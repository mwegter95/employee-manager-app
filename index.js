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
            type: "list",
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
            console.log('Done. What next?')
            runApplication();
            break;

        case "View All Roles":
            await allRoles();
            console.log('Done. What next?')
            runApplication();
            break;
            
        case "View All Employees":
            await allEmployees();
            console.log('Done. What next?')
            runApplication();
            break;
            
        case "View All Employees by Department":
            await employeesDept();
            console.log('Done. What next?')
            runApplication();
            break;
            
        case "View All Employees by Manager":
            await employeesMgr();
            console.log('Done. What next?')
            runApplication();
            break;
                        
        case "Add a Department":
            await addDepartment();
            console.log('Done. What next?')
            runApplication();
            break;

        case "Add a Role":
            await addRole();
            console.log('Done. What next?')
            runApplication();
            break;

        case "Add an Employee":
            await addEmployee();
            console.log('Done. What next?')
            runApplication();
            break;

        case "Update an Employee Role":
            await updateRole();
            console.log('Done. What next?')
            runApplication();
            break;

        case "Update an Employee Manager":
            await updateEmployeeManager();
            console.log('Done. What next?')
            runApplication();
            break;
        
        case "End":
            await quitProgram();
            console.log('See you later. Exiting program.')
            break;
        };
        
    } catch(error) {
        console.log(error)
    };
};


runApplication();

const allDepartments = async () => {
    try {
        const [rows] = await connection.promise().query(`SELECT * FROM departments`);
        return console.table(rows);
    } catch(err) {
        console.log(err)
    }
};

const allRoles = async () => {
    try {
        const [rows] = await connection.promise().query(`SELECT * FROM roles`);

        return console.table(rows);
    } catch(err) {
        console.log(err)
    }
};

const allEmployees = async () => {
    //WHEN I choose to view all employees [ ]THEN I am presented with a formatted table showing employee data, including [x]employee ids, [x]first names, [x]last names, [x]job titles, [x]departments, [x] salaries, and [x]managers that the employees report to (I have the id printing. Would be nice to also have first and last name) 
    try {
        const [rows] = await connection.promise().query(`
        SELECT employees.*, roles.title AS role_job_title, roles.salary AS salary_in_dollars, departments.name AS dept_name
        FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.dept_id = departments.id`);
        return console.table('\n', rows);
    } catch(err) {
        console.log(err)
    }
};

const employeesDept = async () => {
    try {
        const [rows] = await connection.promise().query(`SELECT * FROM employees
        JOIN roles
        ON employees.role_id = roles.id
        JOIN departments
        ON departments.id = roles.dept_id`);
        return console.table(rows);
    } catch(err) {
        console.log(err)
    }
};

const employeesMgr = async () => {
    try {
        const [rows] = await connection.promise().query(`SELECT * FROM roles`);
        return console.table(rows);
    } catch(err) {
        console.log(err)
    }
};

const addDepartment = async () => {
    try {
      const responses = await inquirer.prompt([
        {
          type: "input",
          name: "departmentName",
          message: "What's the new department's name? Please type.",
        },
      ]);
  
      const params = [responses.departmentName];
      const sql = "INSERT into departments (name) VALUES (?)";
  
      await connection.promise().query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }  
      });

      const successMessage = async () => {
        console.log(`New Department added: ${responses.departmentName}`);
      };
  
      successMessage();
    } catch (error) {
      console.log(error);
    }
  };

  const addRole = async () => {
    try {
      const roleNameQuestion = await inquirer.prompt([
        {
        type: "input",
        name: "roleName",
        message: "What's the new role's name? Please type.",
        },
      ]);
  
      const salaryQuestion = await inquirer.prompt([
        {
          type: "input",
          name: "roleSalary",
          message: "Please input salary for role",
        },
      ]);
  
      await allDepartments();
  
      const departmentQuestion = await inquirer.prompt([
        {
          type: "input",
          name: "roleDepartment",
          message: "please input id of department for this role",
        },
      ]);
  
      console.log(`roleName: ${roleNameQuestion.roleName}`);
      console.log(`roleSalary: ${salaryQuestion.roleSalary}`);
      console.log(`roleDepartment: ${departmentQuestion.roleDepartment}`);
  
      const params = [
        roleNameQuestion.roleName,
        salaryQuestion.roleSalary,
        departmentQuestion.roleDepartment,
      ];
      const sql =
        "INSERT into roles (title, salary, dept_id) VALUES (?,?,?)";
  
      await connection.promise().query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
      });

      const successMessage = async () => {
        console.log(`New Role added: ${roleNameQuestion.roleName}`);
      };
  
      successMessage();
    } catch (error) {
      console.log(error);
    }
  };
  