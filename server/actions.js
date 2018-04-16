const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
client.connect();
const actions = {
  addEmployee: (name, baseSalary, emp_id, take_home) => {
    client.query(
      `INSERT INTO employees (name, base_salary, take_home, emp_id) VALUES ('${name}','${baseSalary}','${take_home}','${emp_id}')`,
      (err, res) => {
        if (err) {
          return console.log(err);
        } else {
          console.log("employee added");
        }
      }
    );
  },
  addDeductions: (deductions, emp_id) => {
    deductions.forEach(deduction => {
      client.query(
        `INSERT INTO deductions 
            (emp_id,name,value) 
            VALUES('${emp_id}','${deduction.name}','${deduction.value}')`,
        (err, res) => {
          if (err) {
            return console.log(err);
          } else {
            return console.log("deductions added");
          }
        }
      );
    });
  },
  //update deductions
  editDeductions: (deductions, emp_id) => {
    console.log(deductions);
    deductions.forEach(deduction => {
      client.query(
        `DELETE FROM deductions WHERE emp_id='${emp_id}'`,
        (err, result) => {
          if (err) {
            return console.log(err);
          } else {
            return console.log("delete successful");
          }
        }
      );
    });
    deductions.forEach(deduction => {
      client.query(
        `INSERT INTO deductions 
        (emp_id,name,value) 
        VALUES('${emp_id}','${deduction.name}','${deduction.value}')`,
        (err, res) => {
          if (err) {
            return console.log(err);
          } else {
            return console.log("deductions added");
          }
        }
      );
    });
  },
  //edit employee function
  updateEmployee: (name, baseSalary, emp_id, take_home) => {
    console.log(take_home);
    client.query(
      `UPDATE employees SET name='${name}', base_salary='${baseSalary}', take_home='${take_home}' WHERE emp_id='${emp_id}'`,
      (err, result) => {
        if (err) {
          return console.log(err);
        } else {
          return console.log("success");
        }
      }
    );
  }
};

module.exports = actions;
