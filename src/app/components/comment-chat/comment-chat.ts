import { Component, inject, signal } from '@angular/core';
import { ProjectContextService } from '../../services/project-context-service';
import { AuthService } from '../../services/auth-service';
import { CommentRequest, CommentResponse } from '../../types/U';
import { CommentService } from '../../services/comment-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommentCard } from "../comment-card/comment-card";
import { DropdownLayout } from "../dropdown-layout/dropdown-layout";

@Component({
  selector: 'app-comment-chat',
  imports: [FormsModule, CommentCard, DropdownLayout],
  templateUrl: './comment-chat.html',
  styles: ``,
})
export class CommentChat {
  authProject = inject(ProjectContextService);
  auth = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  taskId = signal('');
  commentModel = signal<CommentRequest>({} as CommentRequest);
  comments = signal<CommentResponse[]>([] as CommentResponse[]);
  commentService = inject(CommentService);
  content = signal('');
  editingCommentId = signal<string | null>(null);
  deletingCommentId = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId.set(params.get('id') ?? '');
      if (!this.taskId) return;
      this.loadComments(this.taskId());
    });
  }

  startEdit(commentId: string) {
    this.editingCommentId.set(commentId);
  }

  stopEdit() {
    this.editingCommentId.set(null);
  }

  openDeleting(commentId: string) {
    this.deletingCommentId.set(commentId === this.deletingCommentId() ? null : commentId);
  }

  closeDeleting() {
    this.deletingCommentId.set(null);
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(this.taskId(), commentId).subscribe({
      next: () => {
        this.comments.update((list) => list.filter((x) => x.id !== commentId));
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }

  loadComments(id: string) {
    this.commentService.getComments(id).subscribe({
      next: (data) => {
        this.comments.set(data);
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }

  send() {
    if (this.content().trim() == '') return;
    this.commentModel.set({ content: this.content() });
    this.createComment(this.commentModel());
  }

  createComment(comment: CommentRequest) {
    this.commentService.createComment(this.taskId(), comment).subscribe({
      next: (data) => {
        this.comments.set([data, ...this.comments()]);
        this.content.set('');
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }
}
