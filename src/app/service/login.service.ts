import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoginSuccess: boolean = false;
  userId: string = '';
  constructor() { }
}
