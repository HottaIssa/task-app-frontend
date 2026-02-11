import { Component, inject, signal } from '@angular/core';
import { PasswordForm, UserResponse } from '../../types/U';
import {
  form,
  FormField,
  maxLength,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-profile',
  imports: [FormField],
  templateUrl: './profile.html',
  styles: ``,
})
export class Profile {
  userService = inject(UserService);
  authService = inject(AuthService);
  profile = signal({} as UserResponse);

  passwordModel = signal<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmationPassword: '',
  });

  passwordForm = form(this.passwordModel, (schemaPath) => {
    required(schemaPath.currentPassword, { message: 'Password is required' });
    required(schemaPath.newPassword, { message: 'Password is required' });
    validate(schemaPath.newPassword, ({ value, valueOf }) => {
      const password = value();
      const currentPassword = valueOf(schemaPath.currentPassword);
      if (password === currentPassword) {
        return {
          kind: 'passwordMatch',
          message: 'New password cannot be the same as the current password',
        };
      }
      return null;
    });
    minLength(schemaPath.newPassword, 6, { message: 'Password must be at least 8 characters' });
    maxLength(schemaPath.newPassword, 20, {
      message: 'Password must be at most 20 characters long',
    });
    required(schemaPath.confirmationPassword, { message: 'Please confirm your password' });
    validate(schemaPath.confirmationPassword, ({ value, valueOf }) => {
      const confirmPassword = value();
      const password = valueOf(schemaPath.newPassword);
      if (confirmPassword !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }
      return null;
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.passwordForm, async () => {
      const credentials = this.passwordModel();
      this.userService.updatePassword(credentials).subscribe({
        next: (response) => {
          this.authService.logout();
        },
        error: (error) => {
          console.error('Registration failed', error);
        },
      });
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.getMyProfile().subscribe((response) => {
      this.profile.set(response);
    });
  }

  isCopied = signal(false);

  copyToClipboard(text: string) {
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.isCopied.set(true);

        setTimeout(() => {
          this.isCopied.set(false);
        }, 2000);
      })
      .catch((err) => {
        console.error('Error al copiar: ', err);
      });
  }
}
