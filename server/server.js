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
const db_creation_string = `CREATE TABLE IF NOT EXISTS employees(id SERIAL PRIMARY KEY, name TEXT, base_salary TEXT, emp_id TEXT);
                            CREATE TABLE IF NOT EXISTS deductions(id SERIAL PRIMARY KEY, emp_id TEXT, deduction_name TEXT, deduction_value DECIMAL);`;

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
  //add data to employees table
  addEmployee(name, baseSalary, emp_id);
  addDeductions(deductions, emp_id);
  res.send({ done: true });
});
//addEmployee
function addEmployee(name, baseSalary, emp_id) {
  client.query(
    `INSERT INTO employees (name, base_salary, emp_id) VALUES ('${name}','${baseSalary}','${emp_id}')`,
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
      (emp_id,deduction_name,deduction_value) 
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
  let baseSalary = req.body.baseSalary;
  let deductions = req.body.deductions;

  updateEmployee(name, baseSalary, emp_id);
  res.send({ done: true });
});

//edit employee function
function updateEmployee(name, baseSalary, emp_id) {
  client.query(
    `UPDATE employees SET name='${name}', base_salary='${baseSalary}' WHERE emp_id='${emp_id}'`,
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
  console.log(req.params);
  console.log(req.query);
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
app.listen(process.env.PORT || 3000, () => console.log("listening"));
