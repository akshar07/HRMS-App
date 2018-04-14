const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

function addEmployee(name, base_salary, emp_id) {
  console.log("called");
  client.query(
    `INSERT INTO employees (name, base_salary,emp_id) VALUES ('${name}','${base_salary}','${emp_id}')`,
    (err, result) => {
      if (err) {
        return console.log(result);
      } else {
        console.log("added");
      }
    }
  );
}

module.exports = addEmployee;
