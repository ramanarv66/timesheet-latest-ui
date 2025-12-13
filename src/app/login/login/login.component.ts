import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  // loginForm: FormGroup;

  // constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
  //   this.loginForm = this.fb.group({
  //     username: ['', [Validators.required]],
  //     password: ['', [Validators.required, Validators.minLength(4)]],
  //   });
  // }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     console.log('Login form submitted', this.loginForm.value);
  //     if(this.loginForm.value.username == this.loginForm.value.password){
  //       this.loginService.isLoginSuccess = true;
  //       this.loginService.userId = this.loginForm.value.username;
  //       this.router.navigate(['/edit'])
  //     }else{
  //       this.loginService.isLoginSuccess = false;
  //     }
  //     // Implement your login logic here
  //   }
  // }
  // redirectToSignup() {
  //     this.router.navigate(['/register']);
  // }

   username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient
  ) {}

  onLogin() {
    if (!this.username || !this.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Details',
        text: 'Please enter both username and password',
        confirmButtonColor: '#f1c40f'
      });
      return;
    }

    const loginRequest = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:8080/api/login', loginRequest).subscribe({
      next: (res: any) => {
        // Save user data
        this.loginService.userId = res.userId;

        // SUCCESS POPUP
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Login successful',
          timer: 1800,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });

        // Redirect to home
              this.loginService.isLoginSuccess = true;
        this.loginService.userId = res.userId;
          this.router.navigate(['/edit']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password',
          confirmButtonColor: '#d33'
        });
      }
    });
  }
}