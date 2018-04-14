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
  res.render("home.ejs");
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
    `INSERT INTO employees (name, base_salary,emp_id) VALUES ('${name}','${baseSalary}','${emp_id}')`,
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
  client.query(`SELECT * FROM deductions`, (err, res) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(res.rows);
      employees = res.rows;
    }
  });
  res.status(200).json(employees);
});
app.listen(process.env.PORT || 3000, () => console.log("listening"));
