webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add-employee/add-employee.component.css":
/***/ (function(module, exports) {

module.exports = ".form {\n  position: relative;\n  padding-bottom: 20px;\n}\n.actions {\n  position: absolute;\n  bottom: 0;\n}\ninput {\n  margin-top: 7px;\n  height: 30px;\n  width: 70%;\n}\n.deductions button {\n  margin-top: 10px;\n}\n.no-padding {\n  padding-left: 0;\n}\n.addDeductions {\n  margin-top: 10px;\n  color: #0366d6;\n  cursor: pointer;\n  width: 80px;\n}\n.ng-valid[required],\n.ng-valid.required {\n  border-left: 5px solid #42a948; /* green */\n}\n.ng-invalid:not(form) {\n  border-left: 5px solid #a94442; /* red */\n}\n.error-msg {\n  color: #a94442;\n  font-size: 12px;\n}\n.orange {\n  color: #da863e;\n}\n.takeHome {\n  margin-top: 10px;\n}\n.heading {\n  margin-left: 15px;\n}\n"

/***/ }),

/***/ "./src/app/add-employee/add-employee.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h4 class=\"orange heading\" *ngIf=\"employeeId === undefined\">Add Employee</h4>\n  <div class=\"col-lg-6 form\">\n    <form [formGroup]=\"inputsForm\" (ngSubmit)=\"OnSubmit(inputsForm.value)\">\n      <div class=\"col-lg-6 no-padding\">\n        <label for=\"employeeName\"> Employee Name:</label>\n      </div>\n      <div class=\"col-lg-6\">\n        <input type=\"text\" formControlName=\"employeeName\" [(ngModel)]=\"employeeName\">\n        <p class=\"error-msg\" *ngIf=\"inputsForm.controls.employeeName.errors?.required &&\n        inputsForm.controls.employeeName.dirty\">Name is required</p>\n      </div>\n      <div class=\"col-lg-6 no-padding\">\n        <label for=\"baseSalary\">Base Salary:</label>\n      </div>\n      <div class=\"col-lg-6 \">\n        <input type=\"number\" name=\"baseSalary\" class=\"form-control\" [(ngModel)]=\"baseSalary\" formControlName=\"baseSalary\" (keyup)=\"calculateTakeHome(inputsForm.value)\">\n        <p class=\"error-msg\" *ngIf=\"inputsForm.controls.baseSalary.errors?.min &&\n        inputsForm.controls.baseSalary.dirty\">Base Salary cannot be negative</p>\n        <p class=\"error-msg\" *ngIf=\"inputsForm.controls.baseSalary.errors?.required &&\n        inputsForm.controls.baseSalary.dirty\">Base Salary is is required</p>\n      </div>\n      <div class=\"deductions\">\n        <label for=\"Deductions\"> Add Deductions</label>\n        <div formArrayName=\"deductions\" *ngFor=\"let deduction of deductions?.controls; let i = index;\">\n          <div [formGroupName]=\"i\">\n            <div class=\"col-lg-6 no-padding\">\n              <input type=\"text\" formControlName=\"name\" placeholder=\" name\" />\n            </div>\n            <div class=\"col-lg-6\">\n              <input type=\"number\" formControlName=\"value\" placeholder=\"Deduction Value\" (keyup)=\"calculateTakeHome(inputsForm.value)\"\n              />\n            </div>\n          </div>\n          <p class=\"error-msg\" *ngIf=\"takeHome<0\">Deductions Cannot be greater than Base salary</p>\n        </div>\n        <div class=\"clearfix\"></div>\n        <p (click)=\"addItem()\" class=\"addDeductions\">Add More</p>\n      </div>\n      <div class=\"actions\">\n        <button class=\" btn btn-success\" type=\"submit\" [disabled]=\"!inputsForm.valid || takeHome<0 \">Save</button>\n      </div>\n    </form>\n    <div *ngIf=\"currentDeductions.length>0\">\n      <label for=\"current\"> Current Deductions</label>\n      <div *ngFor=\"let item of currentDeductions;let index = index;trackBy:trackByIndex;\">\n        <div class=\"col-lg-6\">\n          <input [(ngModel)]=\"currentDeductions[index].name\" placeholder=\"name\">\n        </div>\n        <div class=\"col-lg-6\">\n          <input [(ngModel)]=\"currentDeductions[index].value\" placeholder=\"value\" (blur)=\"reCalculateTakeHome()\">\n\n        </div>\n      </div>\n    </div>\n    <div class=\"clearfix\"></div>\n    <p class=\"takeHome\">\n      <b> Take Home Salary</b> :{{takeHome}} $</p>\n    <br>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/add-employee/add-employee.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEmployeeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_employee_service__ = __webpack_require__("./src/app/services/employee-service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddEmployeeComponent = /** @class */ (function () {
    function AddEmployeeComponent(formBuilder, employeeService) {
        this.formBuilder = formBuilder;
        this.employeeService = employeeService;
        this.currentDeductions = [];
    }
    AddEmployeeComponent.prototype.ngOnInit = function () {
        //iniitalize form
        this.inputsForm = this.formBuilder.group({
            employeeName: [this.employeeName, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            baseSalary: [this.baseSalary, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].min(0)]],
            deductions: this.formBuilder.array([this.createItem()])
        });
    };
    //call service to get deductions of employee
    AddEmployeeComponent.prototype.getEmployeeDeductions = function (id) {
        var _this = this;
        this.employeeService.getEmployee(this.employeeId).subscribe(function (res) {
            _this.currentDeductions = res;
            console.log(res);
        });
    };
    // calculate take home if existing deductions changed
    AddEmployeeComponent.prototype.reCalculateTakeHome = function () {
        var current = [];
        current = this.currentDeductions.map(function (d) { return Number(d.value); });
        var deductionsArray = this.inputsForm.value.deductions
            .map(function (d) { return Number(d.value); })
            .concat(current);
        var totalDeductions = deductionsArray.reduce(function (acc, curr) { return acc + curr; });
        this.takeHome = this.baseSalary - totalDeductions;
    };
    //calculate Take Home salary
    AddEmployeeComponent.prototype.calculateTakeHome = function (formValue) {
        var current = [];
        if (this.currentDeductions.length > 0) {
            current = this.currentDeductions.map(function (d) { return Number(d.value); });
        }
        var deductionsArray = formValue.deductions
            .map(function (d) { return Number(d.value); })
            .concat(current);
        var totalDeductions = deductionsArray.reduce(function (acc, curr) { return acc + curr; });
        this.takeHome = this.baseSalary - totalDeductions;
    };
    //create new dedctions item
    AddEmployeeComponent.prototype.createItem = function () {
        return this.formBuilder.group({
            name: "",
            value: 0
        });
    };
    Object.defineProperty(AddEmployeeComponent.prototype, "deductions", {
        get: function () {
            return this.inputsForm.get("deductions");
        },
        enumerable: true,
        configurable: true
    });
    AddEmployeeComponent.prototype.addItem = function () {
        this.deductions.push(this.createItem());
    };
    //submit form
    AddEmployeeComponent.prototype.OnSubmit = function (formValue) {
        var temp = this.currentDeductions.map(function (d) {
            return { name: d.name, value: Number(d.value) };
        });
        formValue.deductions = formValue.deductions.concat(temp);
        formValue.baseSalary = Number(formValue.baseSalary);
        var employeeObj = Object.assign({}, formValue, { takeHome: this.takeHome });
        //if used for adding employee
        if (this.employeeId === undefined) {
            this.employeeService
                .addEmployee(employeeObj)
                .subscribe(function (res) { return console.log(res); });
            alert("Employee Saved");
        }
        else {
            //for updating employee
            this.employeeService
                .editEmployee(employeeObj, { emp_id: this.employeeId })
                .subscribe(function (res) {
                alert("successful!");
                return console.log(res);
            });
        }
        this.inputsForm.reset();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], AddEmployeeComponent.prototype, "employeeId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], AddEmployeeComponent.prototype, "employeeName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], AddEmployeeComponent.prototype, "baseSalary", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], AddEmployeeComponent.prototype, "takeHome", void 0);
    AddEmployeeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "app-add-employee",
            template: __webpack_require__("./src/app/add-employee/add-employee.component.html"),
            styles: [__webpack_require__("./src/app/add-employee/add-employee.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__services_employee_service__["a" /* EmployeeService */]])
    ], AddEmployeeComponent);
    return AddEmployeeComponent;
}());



/***/ }),

/***/ "./src/app/app-routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_employee_add_employee_component__ = __webpack_require__("./src/app/add-employee/add-employee.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_view_component__ = __webpack_require__("./src/app/view/view.component.ts");



var routes = [
    { path: "", component: __WEBPACK_IMPORTED_MODULE_1__home_home_component__["a" /* HomeComponent */], pathMatch: 'full' },
    { path: "add", component: __WEBPACK_IMPORTED_MODULE_0__add_employee_add_employee_component__["a" /* AddEmployeeComponent */] },
    { path: "allEmployees", component: __WEBPACK_IMPORTED_MODULE_2__view_view_component__["a" /* ViewComponent */] }
];


/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".navbar {\n  background: #da863e;\n}\n\n.navbar-default .navbar-brand,\n.navbar-default .navbar-nav > li > a {\n  color: #fff;\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n\n      <a class=\"navbar-brand\">Datis\n      </a>\n    </div>\n    <ul class=\"nav navbar-nav\">\n\n    </ul>\n    <ul class=\"nav navbar-nav\">\n      <li>\n        <a routerLink=\"/\">Home</a>\n      </li>\n      <li>\n        <a routerLink=\"/add\">Add Employee</a>\n      </li>\n      <li>\n        <a routerLink=\"/allEmployees\">View Employees</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "app-root",
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__add_employee_add_employee_component__ = __webpack_require__("./src/app/add-employee/add-employee.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routes__ = __webpack_require__("./src/app/app-routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_employee_service__ = __webpack_require__("./src/app/services/employee-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__view_view_component__ = __webpack_require__("./src/app/view/view.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__add_employee_add_employee_component__["a" /* AddEmployeeComponent */],
                __WEBPACK_IMPORTED_MODULE_7__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_10__view_view_component__["a" /* ViewComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_routes__["a" /* routes */]),
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ReactiveFormsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_9__services_employee_service__["a" /* EmployeeService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/***/ (function(module, exports) {

module.exports = "h3 {\n  text-align: center;\n}\n"

/***/ }),

/***/ "./src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h3> Welcome to the HR System! </h3>\n</div>\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__("./src/app/home/home.component.html"),
            styles: [__webpack_require__("./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/services/employee-service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmployeeService = /** @class */ (function () {
    function EmployeeService(http) {
        this.http = http;
    }
    EmployeeService.prototype.addEmployee = function (obj) {
        console.log(obj);
        return this.http.post("https://whispering-fortress-39678.herokuapp.com/add", obj);
    };
    EmployeeService.prototype.editEmployee = function (obj, employeeId) {
        var employeeObj = Object.assign(obj, employeeId);
        console.log(employeeObj);
        return this.http.post("https://whispering-fortress-39678.herokuapp.com/edit", employeeObj);
    };
    EmployeeService.prototype.getAllEmployees = function () {
        return this.http.get("https://whispering-fortress-39678.herokuapp.com/all");
    };
    EmployeeService.prototype.getEmployee = function (emp_id) {
        return this.http.get("https://whispering-fortress-39678.herokuapp.com/getOne?id=" + emp_id);
    };
    EmployeeService.prototype.deleteEmployee = function (emp_id) {
        return this.http.delete("https://whispering-fortress-39678.herokuapp.com/delete?id=" + emp_id);
    };
    EmployeeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], EmployeeService);
    return EmployeeService;
}());



/***/ }),

/***/ "./src/app/view/view.component.css":
/***/ (function(module, exports) {

module.exports = ".detailsOn {\n  background: #ffbc83;\n}\n.edit,\n.delete {\n  cursor: pointer;\n}\n.delete {\n  margin-left: 10px;\n}\n.orange {\n  color: #da863e;\n}\n"

/***/ }),

/***/ "./src/app/view/view.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        <h4 class=\"modal-title\">Delete Employee</h4>\n      </div>\n      <div class=\"modal-body\">\n        <p>Are You Sure?</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"deleteEmployee()\">Delete</button>\n      </div>\n    </div>\n\n  </div>\n</div>\n\n<div class=\"container\">\n  <div class=\"col-lg-6\">\n    <h4 class=\"orange\"> All Employees</h4>\n    <table class=\"table table-striped\">\n      <tr>\n        <th> Employee Id</th>\n        <th> Employee Name</th>\n        <th>Edit /Details</th>\n      </tr>\n      <tr *ngFor=\"let employee of employees | async\">\n        <td>{{employee.emp_id}}</td>\n        <td>{{employee.name}}</td>\n        <td>\n          <span class=\"edit\" (click)=\"showDetails(employee.emp_id, employee.name, employee.base_salary,employee.take_home)\">\n            <i class=\"fa fa-edit\"></i>\n          </span>\n          <span class=\"delete\" data-toggle=\"modal\" data-target=\"#myModal\" (click)=\"setEmployeeToDelete=employee.emp_id;detailView=false;\">\n            <i class=\"fa fa-trash\"></i>\n          </span>\n        </td>\n      </tr>\n    </table>\n  </div>\n  <div *ngIf=\"employeeId.length>0 && detailView==true\">\n    <h4 class=\"orange\"> Employee Details</h4>\n    <app-add-employee [takeHome]=\"takeHome\" [employeeName]=\"employeeName\" [baseSalary]=\"employeeSalary\" [employeeId]=\"employeeId\"></app-add-employee>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/view/view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_employee_service__ = __webpack_require__("./src/app/services/employee-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_employee_add_employee_component__ = __webpack_require__("./src/app/add-employee/add-employee.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewComponent = /** @class */ (function () {
    function ViewComponent(employeeService) {
        this.employeeService = employeeService;
        this.employees = [];
        this.detailView = false;
        this.employeeId = "";
        this.employeeName = "";
        this.delete = false;
    }
    ViewComponent.prototype.showDetails = function (emp_id, name, salary, takeHome) {
        var _this = this;
        this.delete = true;
        this.employeeId = emp_id;
        this.employeeName = name;
        this.employeeSalary = salary;
        this.takeHome = takeHome;
        this.detailView = true;
        setTimeout(function () {
            _this.addEmployee.getEmployeeDeductions(emp_id);
        }, 500);
    };
    ViewComponent.prototype.deleteEmployee = function () {
        this.employees = this.employeeService.deleteEmployee(this.setEmployeeToDelete);
    };
    ViewComponent.prototype.ngOnInit = function () {
        this.employees = this.employeeService.getAllEmployees();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__add_employee_add_employee_component__["a" /* AddEmployeeComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__add_employee_add_employee_component__["a" /* AddEmployeeComponent */])
    ], ViewComponent.prototype, "addEmployee", void 0);
    ViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "app-view",
            template: __webpack_require__("./src/app/view/view.component.html"),
            styles: [__webpack_require__("./src/app/view/view.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_employee_service__["a" /* EmployeeService */]])
    ], ViewComponent);
    return ViewComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map