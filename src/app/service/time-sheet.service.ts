import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Timesheet {
  userId: string;
  week: string;
  date: string;
  hoursLogged: number;
  day: string;
  status: string;
  monthNumber: number;
  timesheetId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  private apiUrl = 'http://localhost:8080/api/timesheet';

  constructor(private http: HttpClient) {}

  getTimeSheetByUserId(userId1:string): Observable<Timesheet[]> {
    let userId: string = userId1;
    return this.http.get<Timesheet[]>(`${this.apiUrl}/${userId}`);
  }
}
