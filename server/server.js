const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const shortid = require("shortid");
const app = express();
//cors middleware
app.use(cors());
//require database add function
const addEmployee = require("./actions");
//set static folders
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/dist"));
app.use(express.static(path.join(__dirname, "../client/dist")));
//initialize database
const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
//create tables
const db_creation_string = `CREATE TABLE IF NOT EXISTS employees(id SERIAL PRIMARY KEY, name TEXT, base_salary TEXT, emp_id TEXT);`;

//body parser
app.use(bodyParser.json());

app.get("/", (req, res) => {
  client.query(db_creation_string, (err, res) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("done" + res);
    }
  });
  res.render("index");
});
app.post("/add", (req, res) => {
  let shortId = shortid.generate();
  let name = req.body.employeeName;
  let baseSalary = req.body.baseSalary;
  let deductions = req.body.deductions;
  addEmployee(name, baseSalary, shortId);
});
app.listen(process.env.PORT, () => console.log("listening"));
