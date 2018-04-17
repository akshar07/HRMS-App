import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { routes } from "./app-routes";
import { fail } from "assert";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { ViewComponent } from "./view/view.component";
import { HomeComponent } from "./home/home.component";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe("Router:App", () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent,
        AddEmployeeComponent,
        ViewComponent,
        HomeComponent
      ]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });
  //for home
  it(
    "should redirect you to Home",
    fakeAsync(() => {
      router.navigate([""]).then(
        () => {
          expect(router.url).toBe("/");
        },
        () => {
          fail(router.url, "/", "failed to open page");
        }
      );
    })
  );
  //for add employee
  it(
    "should redirect you to Add Employee",
    fakeAsync(() => {
      router.navigate(["add"]).then(
        () => {
          expect(router.url).toBe("/add");
        },
        () => {
          fail(router.url, "/add", "failed to open page");
        }
      );
    })
  );
  //for view employees
  it(
    "should navigate you to View All Employees",
    fakeAsync(() => {
      router.navigate(["allEmployees"]).then(
        () => {
          expect(router.url).toBe("/allEmployees");
        },
        () => {
          fail(router.url, "/allEmployees", "failed to load the page");
        }
      );
    })
  );
});
