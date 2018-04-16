import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { routes } from "./app-routes";
import { HomeComponent } from "./home/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeService } from "./services/employee-service";
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [AppComponent, AddEmployeeComponent, HomeComponent, ViewComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
