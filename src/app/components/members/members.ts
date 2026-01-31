import { Component, inject, OnInit, signal } from '@angular/core';
import { Member, MemberRequest } from '../../types/U';
import { ProjectService } from '../../services/project-service';
import { DatePipe } from '@angular/common';
import { form, required, FormField } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { ProjectContextService } from '../../services/project-context-service';

@Component({
  selector: 'app-members',
  imports: [DatePipe, FormField],
  templateUrl: './members.html',
  styles: ``,
})
export class Members implements OnInit {
  projectId = signal('');
  authProject = inject(ProjectContextService);
  route = inject(ActivatedRoute);
  memberModel = signal<MemberRequest>({ userId: '', role: 'MEMBER' });
  members = signal<Member[]>([]);
  roleList = ['MEMBER', 'ADMIN', 'VIEWER'];
  private projectService = inject(ProjectService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId.set(params.get('id') ?? '');
      if (!this.projectId) return;
      this.loadData();
    });
  }

  loadData() {
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
        console.log(data);
        this.members.set([...this.members(), data]);
      },
      error: (error) => {
        console.error('Error adding member', error);
      },
    });
  }
}
