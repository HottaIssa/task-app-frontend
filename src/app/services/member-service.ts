import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Member, MemberRequest } from '../types/U';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private apiUrl = `${environment.apiUrl}`;

  private http = inject(HttpClient);

  getMembersByProject(projectId: string) {
    return this.http.get<Member[]>(`${this.apiUrl}/projects/${projectId}/members`);
  }

  addMember(projectId: string, data: MemberRequest) {
    return this.http.post<Member>(`${this.apiUrl}/projects/${projectId}/members`, data);
  }

  updateRoleMember(projectId: string, memberId: string, data: { role: string }) {
    return this.http.patch<{ role: string }>(
      `${this.apiUrl}/projects/${projectId}/members/${memberId}/role`,
      data,
    );
  }

  deactivateMember(projectId: string, memberId: string) {
    return this.http.patch(`${this.apiUrl}/projects/${projectId}/members/${memberId}/deactivate`, {});
  }

  activeMember(projectId: string, memberId: string) {
    return this.http.patch(`${this.apiUrl}/projects/${projectId}/members/${memberId}/active`, {});
  }
}
