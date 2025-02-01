import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-employeedetail',
  templateUrl: './employeedetail.component.html',
  styleUrl: './employeedetail.component.css'
})
export class EmployeedetailComponent {

  empId: string | null = null;
  empName: string | null = null;
  userId: string = 'abcd';
  constructor(private route: ActivatedRoute, private http:HttpClient) {}

  ngOnInit() {
    // Method 1: Using paramMap observable (reactive approach)
    this.route.paramMap.subscribe(params => {
      this.empId = params.get('empid');
      this.userId = this.empId?? '';
      this.empName = params.get('empname');
      console.log('Employee ID:', this.empId);
      console.log('Employee Name:', this.empName);
      let url = 'http://localhost:8080/api/report/'+this.empId
      this.http.get(url, { responseType: 'blob' }).subscribe((response) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const downloadURL = window.URL.createObjectURL(blob);
  
        // Trigger file download
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = `timesheets_${this.empId}.xlsx`;
        link.click();
      });
    });


}
}