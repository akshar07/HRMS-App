import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { EmployeeService } from "../services/employee-service";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"]
})
export class AddEmployeeComponent implements OnInit {
  @Input() employeeId: string;
  @Input() employeeName: string;
  @Input() baseSalary: number;
  @Input() takeHome: number;
  public inputsForm: FormGroup;
  currentDeductions = <any>[];
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    //iniitalize form
    this.inputsForm = this.formBuilder.group({
      employeeName: [this.employeeName, Validators.required],
      baseSalary: [this.baseSalary, [Validators.required, Validators.min(0)]],
      deductions: this.formBuilder.array([this.createItem()])
    });
  }
  //call service to get deductions of employee
  getEmployeeDeductions(id) {
    this.employeeService.getEmployee(this.employeeId).subscribe(res => {
      this.currentDeductions = res;
      console.log(res);
    });
  }
  // calculate take home if existing deductions changed
  reCalculateTakeHome() {
    let current = [];
    current = this.currentDeductions.map(d => Number(d.value));
    let deductionsArray = this.inputsForm.value.deductions
      .map(d => Number(d.value))
      .concat(current);
    let totalDeductions = deductionsArray.reduce((acc, curr) => acc + curr);

    this.takeHome = this.baseSalary - totalDeductions;
  }
  //calculate Take Home salary
  calculateTakeHome(formValue) {
    let current = [];
    if (this.currentDeductions.length > 0) {
      current = this.currentDeductions.map(d => Number(d.value));
    }
    let deductionsArray = formValue.deductions
      .map(d => Number(d.value))
      .concat(current);
    let totalDeductions = deductionsArray.reduce((acc, curr) => acc + curr);

    this.takeHome = this.baseSalary - totalDeductions;
  }
  //create new dedctions item
  createItem(): FormGroup {
    return this.formBuilder.group({
      name: "",
      value: 0
    });
  }

  get deductions(): FormArray {
    return this.inputsForm.get("deductions") as FormArray;
  }
  addItem(): void {
    this.deductions.push(this.createItem());
  }
  //submit form
  public OnSubmit(formValue: any) {
    let temp = this.currentDeductions.map(d => {
      return { name: d.name, value: Number(d.value) };
    });
    formValue.deductions = [...formValue.deductions, ...temp];
    formValue.baseSalary = Number(formValue.baseSalary);
    let employeeObj = Object.assign({}, formValue, { takeHome: this.takeHome });
    //if used for adding employee
    if (this.employeeId === undefined) {
      this.employeeService
        .addEmployee(employeeObj)
        .subscribe(res => console.log(res));
      alert("Employee Saved");
    } else {
      //for updating employee
      this.employeeService
        .editEmployee(employeeObj, { emp_id: this.employeeId })
        .subscribe(res => {
          alert("successful!");
          return console.log(res);
        });
    }
    this.inputsForm.reset();
  }
}
