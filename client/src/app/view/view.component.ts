import { Component, OnInit, ViewChild } from "@angular/core";
import { EmployeeService } from "../services/employee-service";
import { AddEmployeeComponent } from "../add-employee/add-employee.component";
import { Observable } from "rxjs/Observable";
@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.css"]
})
export class ViewComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}
  @ViewChild(AddEmployeeComponent) addEmployee: AddEmployeeComponent;
  employees = <any>[];
  detailView = false;
  employeeId = "";
  employeeName = "";
  employeeSalary;
  takeHome;
  setEmployeeToDelete;
  delete = false;
  showDetails(emp_id, name, salary, takeHome) {
    this.delete = true;
    this.employeeId = emp_id;
    this.employeeName = name;
    this.employeeSalary = salary;
    this.takeHome = takeHome;
    this.detailView = true;

    setTimeout(() => {
      this.addEmployee.getEmployeeDeductions(emp_id);
    }, 500);
  }
  deleteEmployee() {
    this.employees = this.employeeService.deleteEmployee(
      this.setEmployeeToDelete
    );
  }
  ngOnInit() {
    this.employees = this.employeeService.getAllEmployees();
  }
}
