import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required, submit, email, minLength, maxLength } from '@angular/forms/signals';
import { Auth } from '../../services/auth';

interface RegisterData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-register',
  imports: [FormField],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  registerModel = signal<RegisterData>({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  constructor(private authService: Auth, private router: Router){
  }

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.username, { message: 'Username is requiered' });
    required(schemaPath.password, { message: 'Password is requiered' });
    minLength(schemaPath.password, 6, { message: 'Password must be at least 6 characters long' });
    maxLength(schemaPath.password, 20, { message: 'Password must be at most 20 characters long' });
    required(schemaPath.email, { message: 'Email is requiered' });
    email(schemaPath.email, { message: 'Email is not valid' });
    required(schemaPath.firstName, { message: 'First name is requiered' });
    required(schemaPath.lastName, { message: 'Last name is requiered' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.registerForm, async () => {
      const credentials = this.registerModel();
      this.authService.register(credentials).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    });
  }
}
