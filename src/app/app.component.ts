import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from "./student/student";
import { LoginService } from './service/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(public loginService:LoginService){}
  ngOnInit(): void {
   this.student = new Student(1,"Ramana");
   this.varValue = "Ramana"
  }

  title = 'ngrx-app';
  student1: Student = new Student(22,"test");
  varValue: string = ""
  changeValue: string = ""


  student: any;
    

   change(){
    this.student = new Student(1,"Rao");
    this.varValue = "rao"+this.changeValue;
   }

  
  
}
