import {
  TestBed,
  ComponentFixture,
  inject,
  async
} from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { AddEmployeeComponent } from "./add-employee.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeService } from "../services/employee-service";
import { HttpClientModule } from "@angular/common/http";

describe("Component: Add Employee", () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let currentDeductions: Array<any>;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      declarations: [AddEmployeeComponent],
      providers: [EmployeeService]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(AddEmployeeComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    currentDeductions = [{ name: "401K", value: 5000 }];
  });
  let formValue = {
    name: "Akshar Takle",
    baseSalary: 120000,
    deductions: [
      { name: "Tax", value: 10000 },
      { name: "health", value: 10000 }
    ]
  };
  it("should calculalte base salary correctly", () => {
    component.baseSalary = 120000;
    let totalDeductions = component.calculateTakeHome(formValue);
    expect(component.takeHome).toEqual(100000);
  });
});
