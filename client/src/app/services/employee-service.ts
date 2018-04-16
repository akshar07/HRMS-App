import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RequestOptions, Request } from "@angular/http";
@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmployee(obj) {
    console.log(obj);
    return this.http.post(
      "https://whispering-fortress-39678.herokuapp.com/add",
      obj
    );
  }
  editEmployee(obj, employeeId) {
    let employeeObj = Object.assign(obj, employeeId);
    console.log(employeeObj);
    return this.http.post(
      "https://whispering-fortress-39678.herokuapp.com/edit",
      employeeObj
    );
  }
  getAllEmployees() {
    return this.http.get("https://whispering-fortress-39678.herokuapp.com/all");
  }
  getEmployee(emp_id) {
    return this.http.get(
      `https://whispering-fortress-39678.herokuapp.com/getOne?id=${emp_id}`
    );
  }

  deleteEmployee(emp_id) {
    return this.http.delete(
      `https://whispering-fortress-39678.herokuapp.com/delete?id=${emp_id}`
    );
  }
}
