const MySQL = require('mysql');
const inquirer = require('inquirer');

var connection = MySQL.createConnection({
    host: 'localhost',
    port: 3001,
    user: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    database: 'employee_db'
})

connection.connect(err=>{
    if(err){
        throw err
    }
    startDB();
});

function startDB() {
    inquirer.prompt({
        
    })
}