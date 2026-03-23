import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GuestResponse, PasswordForm, UserResponse } from '../types/U';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  http = inject(HttpClient);

  getMyProfile() {
    return this.http.get<UserResponse>(`${this.apiUrl}/me`);
  }

  getInvitations() {
    return this.http.get<GuestResponse[]>(`${this.apiUrl}/invitations`);
  }

  updatePassword(data: PasswordForm) {
    return this.http.patch<string>(`${this.apiUrl}/password`, data);
  }

  updateAvatar(file: File) {
const formData = new FormData();
formData.append('file', file);

return this.http.patch(`${this.apiUrl}/avatar`, formData, {
  responseType: 'text',
});  }
}
