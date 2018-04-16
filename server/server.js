const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const shortid = require("shortid");
const app = express();
const express_enforces_ssl = require("express-enforces-ssl");
//cors middleware
app.use(cors());
//set static folders
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../dist/public"));
app.use(express.static(path.join(__dirname, "../dist/public")));
//initialize database
const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
//create tables
client.connect();
const db_creation_string = `CREATE TABLE IF NOT EXISTS employees(id SERIAL PRIMARY KEY, name TEXT, base_salary DECIMAL, take_home DECIMAL, emp_id TEXT);
                            CREATE TABLE IF NOT EXISTS deductions(id SERIAL PRIMARY KEY, emp_id TEXT, name TEXT, value DECIMAL);`;
//body parser
app.enable("trust proxy");
app.use(express_enforces_ssl());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

app.get("/", (req, res) => {
  console.log(db_creation_string);
  client.query(db_creation_string, (err, res) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("done" + res);
    }
  });
  res.render("index.ejs");
});
app.post("/add", (req, res) => {
  console.log(req.body);
  let emp_id = shortid.generate();
  let name = req.body.employeeName;
  let baseSalary = req.body.baseSalary;
  let deductions = req.body.deductions;
  let take_home = req.body.takeHome;
  //add data to employees table
  addEmployee(name, baseSalary, emp_id, take_home);
  addDeductions(deductions, emp_id);
  res.send({ done: true });
});
//addEmployee
function addEmployee(name, baseSalary, emp_id, take_home) {
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
}
//add deductions
function addDeductions(deductions, emp_id) {
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
}
//update deductions
function editDeductions(deductions, emp_id) {
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
}
//get all employees
app.get("/all", (req, res) => {
  let employees = [];
  client.query(`SELECT * FROM employees`, (err, result) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(result.rows);
      res.send(result.rows);
    }
  });
});
//edit employee route
app.post("/edit", (req, res) => {
  let emp_id = req.body.emp_id;
  console.log(emp_id);
  let name = req.body.employeeName;
  let baseSalary = Number(req.body.baseSalary);
  let deductions = req.body.deductions;
  let take_home = Number(req.body.takeHome);
  updateEmployee(name, baseSalary, emp_id, take_home);
  editDeductions(deductions, emp_id);
  res.send({ done: true });
});

//edit employee function
function updateEmployee(name, baseSalary, emp_id, take_home) {
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
// get one employe route
app.get("/getOne", (req, res) => {
  let id = req.query.id;
  client.query(
    `SELECT * FROM deductions WHERE emp_id='${id}'`,
    (err, result) => {
      if (err) {
        return console.log(err);
      } else {
        console.log(result);
        res.send(result.rows);
      }
    }
  );
});
// delete employee
app.delete("/delete", (req, res) => {
  let id = req.query.id;
  client.query(`DELETE from employees WHERE emp_id='${id}'`, (err, result) => {
    if (err) {
      return console.log(err);
    } else {
      return console.log("deleted successfully");
    }
  });
  client.query(`DELETE FROM deductions WHERE emp_id='${id}'`, (err, result) => {
    if (err) {
      return console.log(err);
    } else {
      return console.log("delete successful");
    }
  });
  client.query(`SELECT * FROM employees`, (err, result) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(result.rows);
      res.send(result.rows);
    }
  });
});
app.listen(process.env.PORT || 3000, () => console.log("listening"));
