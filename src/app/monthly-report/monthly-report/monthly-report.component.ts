import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css'],
})
export class MonthlyReportComponent {
  selectedMonthYear = `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, '0')}`;

  private baseUrl = 'http://localhost:8080'; // adjust if needed

  constructor(
    private http: HttpClient,
    public loginService: LoginService
  ) {}

  onMonthChange() {
    // later if you want to refresh grid view
    
  }

  refresh() {
    this.onMonthChange();
  }

  downloadExcel() {
    const [yearStr, monthStr] = this.selectedMonthYear.split('-');
    const year = Number(yearStr);
    const month = Number(monthStr);

    const url = `${this.baseUrl}/reports/monthly?year=${year}&month=${month}`;

    this.http
      .get(url, { responseType: 'blob' })
      .subscribe((blob: Blob) => {
        const fileName = `Timesheet-${this.selectedMonthYear}.xlsx`;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
      });
  }
}
