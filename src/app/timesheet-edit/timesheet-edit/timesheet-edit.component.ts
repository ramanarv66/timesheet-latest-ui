import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-timesheet-edit',
  templateUrl: 'timesheet-edit.component.html',
  styleUrl: 'timesheet-edit.component.css',
    providers: [provideNativeDateAdapter()],
})
export class TimesheetEditComponent {
isDisable = false;
  selectedMonthYear = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
 weeks: {
  date: Date;
  day: number;
  hours: number;
  isWeekend: boolean;
  isToday: boolean;
  isDisabled: boolean;
}[][] = [];
  currentMonth: number = 0;

  constructor(private http: HttpClient, public loginService: LoginService){}
  ngOnInit() {
    this.loadDates();
  }
selectedMonthDate = new Date();

chosenMonthHandler(normalizedMonth: Date, datepicker: any) {
  this.selectedMonthDate = normalizedMonth;

  // Convert to yyyy-MM format you already use
  this.selectedMonthYear =
    normalizedMonth.getFullYear() +
    "-" +
    String(normalizedMonth.getMonth() + 1).padStart(2, "0");

  this.loadDates();
  datepicker.close();
}


loadDates() {
  if (!this.selectedMonthYear) return;

  const [yearStr, monthStr] = this.selectedMonthYear.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr) - 1;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();

  this.weeks = [];
  let week: any[] = [];

  // ⭐ FIX: pad empty cells BEFORE first day of month
  const padDays = firstDay.getDay(); // 0=Sun
  for (let i = 0; i < padDays; i++) {
    week.push(null);
  }

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    const dateCopy = new Date(d);
    const weekend = dateCopy.getDay() === 0 || dateCopy.getDay() === 6;

    week.push({
      date: dateCopy,
      day: dateCopy.getDate(),
      hours: 0,
      isWeekend: weekend,
      isToday: dateCopy.toDateString() === today.toDateString(),
      isDisabled: weekend
    });

    if (dateCopy.getDay() === 6) {
      this.weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) this.weeks.push(week);
}

  saveTimesheet1() {
    const payload = this.weeks.flatMap(week =>
      week
        .filter(day => day) // Exclude empty slots
        .map(day => ({
          userId: this.loginService.userId, 
          week: `Week ${this.weeks.indexOf(week) + 1}`,
          date: day.date.toISOString().substring(0, 10), 
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
  
  saveTimesheetProceed(){
     Swal.fire({
  title: 'Submit Timesheet?',
  text: 'Please confirm before submitting.',
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#aaa',
  confirmButtonText: 'Submit',
  heightAuto: false
}).then(result => {
  if (result.isConfirmed) {
    this.saveTimesheet();
  }
});

  }
  saveTimesheet() {
   

  const payload = this.weeks.flatMap((week, weekIndex) =>
    week
      .filter(day => day) // Exclude null padding
      .map(day => ({
        userId: this.loginService.userId,
        week: `Week ${weekIndex + 1}`,
        date: this.formatDate(day.date),
        hoursLogged: day.hours,
        day: day.day,
        monthNumber: this.currentMonth
      }))
  );

  

  this.http.post('http://localhost:8080/api/timesheet/save', payload)
  .subscribe(
    (res: any) => {
      console.log("SUCCESS", res);
      this.isDisable = true;
     Swal.fire({
  icon: 'success',
  title: 'Success!',
  text: 'Timesheet saved successfully!',
  confirmButtonColor: '#4CAF50',
  heightAuto: false
});

    },
    (error) => {
     Swal.fire({
  icon: 'error',
  title: 'Oops!',
  text: 'Something went wrong while saving.',
  confirmButtonColor: '#d33',
  heightAuto: false
});

    }
  );
}
formatDate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

  
}
