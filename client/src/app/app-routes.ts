import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { HomeComponent } from "./home/home.component";
import { ViewComponent } from "./view/view.component";

export const routes: Routes = [
  { path: "", component: HomeComponent,pathMatch:'full' },
  { path: "add", component: AddEmployeeComponent },
  { path: "allEmployees", component: ViewComponent }
];
