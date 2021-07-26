const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    database: 'employee_db'
})

connection.connect(function(err) {
  if (err) throw err;
startDB();
}
  
);

function startDB() {
    inquirer.prompt({
       name: 'action',
       type: 'list',
       message: 'What is your inquirery?',
       choices: [
        "View employees",
        "View departments",
        'View positions',
        'Add a new employee',
        'Add a new department',
        'Add a new position',
        "Update existing employee's position",
        "Quit"
       ]
    }).then(function(choice){
        switch (choice.action) {
            case 'View employees': searchEmployees();
            break;
            case 'View departments': searchDepartments();
            break;
            case 'View positions': searchPositions();
            break;
            case 'Add a new employee': addEmployee();
            break;
            case 'Add a new department': addDepartment();
            break;
            case 'Add a new position': addPosition();
            break;
            case "Update existing employee's position": updatePosition();
            break;
            case "Quit": connection.end();
            break;
        }
    })
}

function searchEmployees() {
    connection.query('SELECT employees.employee_id, employees.first_name, employees.last_name, position.title, department.name AS department, position.salary, CONCAT(manager.first_name, " ", manager.last_name) as manager FROM employees LEFT JOIN position on employees.position_id = position.position_id LEFT JOIN department on position.department_id = department.department_id LEFT JOIN employees manager on manager.manager_id = employees.manager_id', function(err, res) {
        if (err) throw err
        console.table(res)
        startDB();
    })
}

function searchDepartments() {
    connection.query('SELECT * from department', function(err, res) {
        if (err) throw err
        console.table(res)
        startDB();
    })
}

function searchPositions() {
    connection.query('SELECT * from position', function(err, res){
        if (err) throw err
        console.table(res)
        startDB();
    })
}
function updateEmployeeManager (employeeID, positionID){
    connection.query("UPDATE employees SET position_id = ? WHERE employee_id = ?", [employeeID, positionID])
    };

    function addEmployee() {
        var questions = [
          {
            type: "input",
            message: "What's the employee's first name?",
            name: "first_name"
          },
          {
            type: "input",
            message: "What's the employee's last name?",
            name: "last_name"
          },
          {
            type: "input",
            message: "What's the employee's title (position_id)?",
            name: "titleID"
          },
          {
            type: "input",
            message: "Who's the employee's manager (employee_id)?",
            name: "managerID"
          }
        ];
        inquirer.prompt(questions).then(function(answer) {
          connection.query(
            "INSERT INTO employees SET ?",
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              position_id: answer.titleID,
              manager_id: answer.managerID,
            },
            function(error) {
              if (error) throw error;
              updateEmployeeManager(answer.titleID, answer.managerID);
              searchEmployees();
            }
          );
        });
      };

      function addDepartment() {
        inquirer
          .prompt({
            type: "input",
            message: "What would you like to name the new department?",
            name: "department"
          })
          .then(function(answer) {
              console.log(answer.department);
            connection.query("INSERT INTO department SET ?",
              {
                name: answer.department,
              },
              function(err, res) {
                if (err) throw err;
                startDB();
              });
          });
      };
      
      function addPosition() {
        var questions = [
          {
            type: "input",
            message: "What type of position would you like to add?",
            name: "title"
          },
          {
            type: "input",
            message: "In what department is the new position?",
            name: "id"
          },
          {
            type: "list",
            message: "What is the salary for this position?",
            name: "salary"
          }
        ];
        inquirer.prompt(questions).then(function(answer) {
          connection.query(
            "INSERT INTO position SET ?",
            {
              title: answer.title,
              department_id: answer.id,
              salary: answer.salary
            },
            function(error, res) {
              if (error) throw error;
              startDB();
            }
          );
        });
      };
      function updatePosition() {
        var employees = searchEmployees();
        var employeeChoices = employees.map(id => {
          id: id;
        })
        inquirer.prompt({
         type: "list",
         name: "position id",
        message: " WHich position would you like to assign the employee?",
        choices: employeeChoices
      
        })
        connection.query("UPDATE employees SET postion_id = ? WHERE employee_id = ?", [positionID, employeeID])
      //test
      };