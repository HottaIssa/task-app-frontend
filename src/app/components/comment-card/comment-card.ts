import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { CommentRequest, CommentResponse } from '../../types/U';
import { ProjectContextService } from '../../services/project-context-service';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment-service';

@Component({
  selector: 'app-comment-card',
  imports: [FormsModule],
  templateUrl: './comment-card.html',
  styles: ``,
})
export class CommentCard implements OnInit {
  isEditing = input.required<boolean>();
  editRequested = output<void>();
  cancelEditRequested = output<void>();
  cancelDeleteRequested = output<void>();
  comment = input.required<CommentResponse>();
  authProject = inject(ProjectContextService);
  auth = inject(AuthService);
  commentService = inject(CommentService);
  taskId = input.required<string>();
  commentLocal = signal<CommentResponse>({} as CommentResponse);
  commentModal = signal<CommentRequest>({} as CommentRequest);
  content = signal('');

  deleteRequested = output<void>();

  onDeleteClick() {
    this.deleteRequested.emit();
  }

  ngOnInit() {
    this.commentLocal.set(this.comment());
    this.content.set(this.comment().content);
  }

  startEdit() {
    this.content.set(this.comment().content);
    this.editRequested.emit();
  }

  cancelEditing() {
    this.cancelEditRequested.emit();
  }

  updateComment() {
    this.commentModal.set({ content: this.content() });
    this.commentService
      .updateComment(this.taskId(), this.comment().id, this.commentModal())
      .subscribe((data) => {
        this.commentLocal.set(data);
        this.cancelEditing();
      });
  }
}
