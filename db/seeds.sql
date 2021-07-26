DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
    department_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

INSERT INTO department (name)
VALUES ('sales'), ("Engineering"), ('Financing'), ('Legal(HR)');

CREATE TABLE position (
    position_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    CONSTRAINT ls_department FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

CREATE TABLE employees(
    employee_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    position_id INT,
    manager_id INT NULL,
    CONSTRAINT ls_manager FOREIGN KEY (manager_id) REFERENCES empoyee(employee_id) ON DELETE CASCADE,
    CONSTRAINT ls_position FOREIGN KEY (position_id) REFERENCES role(postion_id) ON DELETE CASCADE
);

INSERT INTO role (tite, salary, department_id)
VALUES ('Sales Leader', 90000, 1);
INSERT INTO role (tite, salary, department_id)
VALUES ("Sales", 40000, 1);
INSERT INTO role (tite, salary, department_id)
VALUES ('Engineering Director', 150000, 2);
INSERT INTO role (tite, salary, department_id)
VALUES ('Engineer', 90000, 2);
INSERT INTO role (tite, salary, department_id)
VALUES ('Accountant Lead', 70000, 3);
INSERT INTO role (tite, salary, department_id)
VALUES ('Accountant', 50000, 3);
INSERT INTO role (tite, salary, department_id)
VALUES ('HR Rep', 45000, 4);

INSERT INTO employees (first_name, last_name, position_id, manager_id)
VALUES ('Garret', "Silvas", 1, NULL)
INSERT INTO employees (first_name, last_name, position_id, manager_id)
VALUES ('Hunter', "Sham", 3, NULL)
INSERT INTO employees (first_name, last_name, position_id, manager_id)
VALUES ("Melissa", "McEntee", 3, NULL)
INSERT INTO employees (first_name, last_name, position_id, manager_id)
VALUES ("Brice", "Whitefield", 4), NULL
INSERT INTO employees (first_name, last_name, position_id, manager_id)
VALUES ('Jacob', "Duden", 2, NULL)
INSERT INTO employees (first_name, last_name, position_id, manager_id)
VALUES ('Austin', "Meyers", 2, NULL)
INSERT INTO employees (first_name, last_name, position_id, manager_id)
VALUES ('Sam', 'Day', 1, NULL)