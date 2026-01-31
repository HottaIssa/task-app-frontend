import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { LoginRequest, LoginResponse, RegisterRequest, UserResponse } from '../types/U';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  http = inject(HttpClient)

  register(data: RegisterRequest) {
    return this.http.post<UserResponse>(`${this.apiUrl}/register`, data);
  }

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  getMyProfile() {
    return this.http.get<UserResponse>(`${this.apiUrl}/me`);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  }

  getId(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken:any = jwtDecode(token);
    return decodedToken.sub as string;
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken:any = jwtDecode(token);
    return decodedToken.username as string;
  }
}
