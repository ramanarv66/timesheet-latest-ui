import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/report/timesheet/export";

  downloadReport() {
    // Logic to download the report
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    this.http.get(`${this.url}/${year}/${month}`, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        if(response){
          // Create a blob link to download
          const link = document.createElement('a');
          const url = window.URL.createObjectURL(response);
          link.href = url;
          link.download = `timesheet-${year}-${month}.xlsx`;
          link.click();
          window.URL.revokeObjectURL(url);
          Swal.fire('Success', 'Report downloaded successfully.', 'success');
        }
      },
      error: () => {
        Swal.fire('Error', 'Failed to download the report.', 'error');
      }
    });
  }
}
