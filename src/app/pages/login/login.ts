import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import {form, FormField, required, submit, minLength, maxLength} from "@angular/forms/signals";
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  loginModel = signal<LoginData>({
    username: '',
    password: '',
  });

  constructor(private authService: Auth, private router: Router){

  }

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is requiered'});
    required(schemaPath.password, {message: 'Password is requiered'});
    minLength(schemaPath.password, 6, {message: 'Password must be at least 6 characters long'});
    maxLength(schemaPath.password, 20, {message: 'Password must be at most 20 characters long'});
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.loginForm, async()=>{
      const credentials = this.loginModel();

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.authService.saveToken(response.token);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });

    })
  }
}
