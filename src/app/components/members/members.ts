import { Component, inject, input, signal } from '@angular/core';
import { ModalLayout } from '../modal-layout/modal-layout';
import { Member, MemberRequest, roleMember } from '../../types/U';
import { ProjectService } from '../../services/project-service';
import { DatePipe } from '@angular/common';
import { form, required, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-members',
  imports: [ModalLayout, DatePipe, FormField],
  templateUrl: './members.html',
  styles: ``,
})
export class Members {
  isModalOpen = signal(false);
  projectId = input.required<string>();
  role = input.required<string>();
  memberModel = signal<MemberRequest>({ userId: '', role: 'MEMBER' });
  members = signal<Member[]>([]);
  roleList = ['MEMBER', 'ADMIN', 'VIEWER'];
  private projectService = inject(ProjectService);

  openModal() {
    this.isModalOpen.set(true);
    this.projectService.getMembersByProject(this.projectId()).subscribe({
      next: (data) => {
        this.members.set(data);
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }

  memberForm = form(this.memberModel, (schemaPath) => {
    required(schemaPath.userId, { message: 'User ID is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    this.projectService.addMember(this.projectId(), this.memberModel()).subscribe({
      next: (data) => {
        this.members.set([...this.members(), data]);
      },
      error: (error) => {
        console.error('Error adding member', error);
      },
    });
  }
}
