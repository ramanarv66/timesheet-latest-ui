import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { TimesheetEditComponent } from './timesheet-edit/timesheet-edit/timesheet-edit.component';
import { TimesheetApproveComponent } from './timesheet-approve/timesheet-approve/timesheet-approve.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { ManagerComponent } from './manager/manager/manager.component';
import { EmployeedetailComponent } from './employee-detail/employeedetail/employeedetail.component';
import { DisplayResultComponent } from './display/display-result/display-result.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgChartsModule } from 'ng2-charts';
import { MonthlyReportComponent } from './monthly-report/monthly-report/monthly-report.component';
import { MaterialModule } from './material.module';
import { ActionComponent } from './action/action/action.component';


const routes: Routes = [
  { path: 'edit', component: TimesheetEditComponent },
  { path: 'approve', component: TimesheetApproveComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'actions', component: ActionComponent },
  { path: ":empname/:empid", component: EmployeedetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    ParentComponent,
     TimesheetEditComponent,
    TimesheetApproveComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ManagerComponent,
    EmployeedetailComponent,
    DisplayResultComponent,
    MonthlyReportComponent
  ],
  imports: [
    BrowserModule,HttpClientModule ,BrowserAnimationsModule, MaterialModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,FormsModule,
    OverlayPanelModule,ButtonModule, BrowserAnimationsModule, ReactiveFormsModule,
    MatTableModule,MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule,
    NgChartsModule 
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
