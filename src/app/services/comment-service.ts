import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CommentRequest, CommentResponse } from '../types/U';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}`;

  http = inject(HttpClient);

  getComments(taskId: string) {
    return this.http.get<CommentResponse[]>(`${this.apiUrl}/tasks/${taskId}/comments`);
  }

  createComment(taskId: string, data: CommentRequest) {
    return this.http.post<CommentResponse>(`${this.apiUrl}/tasks/${taskId}/comments`, data);
  }

  updateComment(taskId: string, commentId: string, data: CommentRequest) {
    return this.http.put<CommentResponse>(`${this.apiUrl}/tasks/${taskId}/comments/${commentId}`, data);
  }

  deleteComment(taskId: string, commentId: string) {
    return this.http.delete(`${this.apiUrl}/tasks/${taskId}/comments/${commentId}`);
  }
}
