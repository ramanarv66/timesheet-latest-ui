import { Component } from '@angular/core';
import { Timesheet, TimesheetService } from '../../service/time-sheet.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-timesheet-approve',
  templateUrl: 'timesheet-approve.component.html',
  styleUrl: 'timesheet-approve.component.css',
})
export class TimesheetApproveComponent {

  fetchedData: Timesheet[]=[];
  fetchTimesheets(): void {
    this.timesheetService.getTimeSheetByUserId(this.loginService.userId ).subscribe({
      next: (data: Timesheet[]) => {
        this.selectedMonthYear = data[0].date.substring(0, data[0].date.length-3)
        this.fetchedData = data;
        this.loadDates();
      },
      error: (err) => console.error('Error fetching timesheets:', err),
    });
  }

 
  selectedMonthYear = '';
    weeks: { date: string; day: string; hours: number; isWeekend: boolean }[][] = [];
  
    constructor(private http: HttpClient, private loginService: LoginService,
      private timesheetService: TimesheetService){}
    ngOnInit() {
      this.fetchTimesheets();
     
    }
  
    loadDates() {
      const [year, month] = this.selectedMonthYear.split('-').map(Number);
      const daysInMonth = new Date(year, month, 0).getDate();
      const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  
      const dates: { date: string; day: string; hours: number; isWeekend: boolean }[] = [];
      this.fetchedData.forEach((element:Timesheet, dayIndex) => {
        const date = new Date(year, month - 1, dayIndex+1);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const isWeekend = dayName === 'Saturday' || dayName === 'Sunday';
        dates.push({
          date: `${dayIndex+1}/${month}/${year}`,
          day: dayName,
          hours: isWeekend ? 0 : element.hoursLogged,
          isWeekend,
        });
       });
      this.weeks = [];
      let week: any[] = new Array(firstDayOfMonth).fill(null); // Fill the first week with empty slots for alignment
      console.log('week', week)
      dates.forEach((date, index) => {
        week.push(date);
        if ((index + firstDayOfMonth + 1) % 7 === 0 || index === dates.length - 1) {
          this.weeks.push(week);
          week = [];
        }
      });
    }
  
    saveTimesheet() {
      const payload = this.weeks.flatMap(week =>
        week
          .filter(day => day) // Exclude empty slots
          .map(day => ({
            userId: 'user1', // Replace with the actual user ID
            week: `Week ${this.weeks.indexOf(week) + 1}`,
            date: day.date,
            hoursLogged: day.hours,
          }))
      );
    
      this.http.post('http://localhost:8080/api/timesheet/save', payload).subscribe({
        next: () => alert('Timesheet saved successfully!'),
        error: err => console.error('Error saving timesheet:', err),
      });
    }
    approveTimeSheet(){ }
  
}
