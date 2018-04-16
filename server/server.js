const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const shortid = require("shortid");
const app = express();
const express_enforces_ssl = require("express-enforces-ssl");
const actions = require("./actions");
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
  actions.addEmployee(name, baseSalary, emp_id, take_home);
  actions.addDeductions(deductions, emp_id);
  res.send({ done: true });
});
//addEmployee

//add deductions

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
  actions.updateEmployee(name, baseSalary, emp_id, take_home);
  actions.editDeductions(deductions, emp_id);
  res.send({ done: true });
});

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
      console.log("resent employees");
      res.send(result.rows);
    }
  });
});
app.listen(process.env.PORT || 3000, () => console.log("listening"));
