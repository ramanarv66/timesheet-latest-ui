import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoginSuccess: boolean = false;
  userId: string = '';
  constructor(private http: HttpClient) { }

    loginUser(loginRequest: { username: string; password: string }) {
    return this.http.post('/api/login', loginRequest);
  }
}
