const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const shortid = require("shortid");
const app = express();
const express_enforces_ssl = require("express-enforces-ssl");
//cors middleware
app.use(cors());
//require database add function
const addEmployee = require("./actions");
//set static folders
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../dist"));
app.use(express.static(path.join(__dirname, "../dist")));
//initialize database
const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
//create tables

client.connect();
const db_creation_string = `CREATE TABLE IF NOT EXISTS employees(id SERIAL PRIMARY KEY, name TEXT, base_salary TEXT, emp_id TEXT);`;

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
  // client.query(db_creation_string, (err, res) => {
  //   if (err) {
  //     return console.log(err);
  //   } else {
  //     console.log("done" + res);
  //   }
  // });
  // res.render("index.ejs");
});
app.post("/add", (req, res) => {
  console.log(req.body);
  let emp_id = shortid.generate();
  let name = req.body.employeeName;
  let baseSalary = req.body.baseSalary;

  client.query(
    `INSERT INTO employees (name, base_salary,emp_id) VALUES ('${name}','${baseSalary}','${emp_id}')`,
    (err, result) => {
      if (err) {
        return console.log(err);
      } else {
        console.log("added");
      }
    }
  );
  // let deductions = req.body.deductions;
  // addEmployee(name, baseSalary, shortId);
  res.send({ done: true });
});
app.listen(process.env.PORT || 3000, () => console.log("listening"));
