import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-timesheet-edit',
  templateUrl: 'timesheet-edit.component.html',
  styleUrl: 'timesheet-edit.component.css',
})
export class TimesheetEditComponent {

  selectedMonthYear = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
  weeks: { date: string; day: string; hours: number; isWeekend: boolean }[][] = [];
  currentMonth: number = 0;

  constructor(private http: HttpClient, public loginService: LoginService){}
  ngOnInit() {
    this.loadDates();
  }

  loadDates() {
    const [year, month] = this.selectedMonthYear.split('-').map(Number);
    this.currentMonth = month;
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    const dates: { date: string; day: string; hours: number; isWeekend: boolean }[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const isWeekend = dayName === 'Saturday' || dayName === 'Sunday';
      dates.push({
        date: `${day}/${month}/${year}`,
        day: dayName,
        hours: isWeekend ? 0 : 0,
        isWeekend,
      });
    }
console.log('dates', dates)
    // Group dates into weeks
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
          userId: this.loginService.userId, 
          week: `Week ${this.weeks.indexOf(week) + 1}`,
          date: day.date,
          hoursLogged: day.hours,
          day: day.day,
          monthNumber: this.currentMonth
        }))
    );
  
    this.http.post('http://localhost:8080/api/timesheet/save', payload).subscribe({
      next: () => alert('Timesheet saved successfully!'),
      error: err => console.error('Error saving timesheet:', err),
    });
  }
  
  
}
