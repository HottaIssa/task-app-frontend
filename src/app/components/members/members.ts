import { Component, inject, OnInit, signal } from '@angular/core';
import { Member, MemberRequest } from '../../types/U';
import { DatePipe } from '@angular/common';
import { form, required, FormField } from '@angular/forms/signals';
import { ActivatedRoute, isActive } from '@angular/router';
import { ProjectContextService } from '../../services/project-context-service';
import { FormsModule } from "@angular/forms";
import { MemberService } from '../../services/member-service';

@Component({
  selector: 'app-members',
  imports: [DatePipe, FormField, FormsModule],
  templateUrl: './members.html',
  styles: ``,
})
export class Members implements OnInit {
  projectId = signal('');
  authProject = inject(ProjectContextService);
  route = inject(ActivatedRoute);
  memberModel = signal<MemberRequest>({ userId: '', role: 'MEMBER' });
  members = signal<Member[]>([]);
  filterMembers = signal<Member[]>([]);
  isActiveMembers = signal(true);
  roleList = ['MEMBER', 'ADMIN', 'VIEWER'];
  private memberService = inject(MemberService);
  editMemberId = signal('');
  newRole = signal('');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId.set(params.get('id') ?? '');
      if (!this.projectId) return;
      this.loadData();
    });
  }

  toggleMembers(){
    this.isActiveMembers.set(!this.isActiveMembers());
    this.filterMembers.set(this.members().filter((m) => m.isActive === this.isActiveMembers()));
  }

  openEdit(role: string, id: string) {
    this.newRole.set(role.toUpperCase());
    this.editMemberId.set(id);
  }

  updateRole(memberId: string, role: { role: string }) {
    this.memberService.updateRoleMember(this.projectId(), memberId, role).subscribe({
      next: (data) => {
        this.filterMembers.update((member) =>
          member.map((m) =>
            m.id === memberId
              ? {
                  ...m,
                  roleMember: role.role.charAt(0).toUpperCase() + role.role.slice(1).toLowerCase(),
                }
              : m,
          ),
        );
        this.editMemberId.set('');
      },
      error: (error) => {
        console.error('Error adding member', error);
      },
    });
  }

  loadData() {
    this.memberService.getMembersByProject(this.projectId()).subscribe({
      next: (data) => {
        this.members.set(data);
        this.filterMembers.set(this.members().filter((m) => m.isActive === this.isActiveMembers()));
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
    this.memberService.addMember(this.projectId(), this.memberModel()).subscribe({
      next: (data) => {
        this.filterMembers.set([...this.filterMembers(), data]);
      },
      error: (error) => {
        console.error('Error adding member', error);
      },
    });
  }

  deactivateMember(memberId: string) {
    this.memberService.deactivateMember(this.projectId(), memberId).subscribe({
      next: (data) => {
        this.filterMembers.update((member) =>
          member.map((m) =>
            m.id === memberId
              ? {
                  ...m,
                  isActive: false,
                }
              : m,
          ),
        );
      },
      error: (error) => {
        console.error('Error adding member', error);
      },
    });
  }

  activeMember(memberId: string) {
    this.memberService.activeMember(this.projectId(), memberId).subscribe({
      next: (data) => {
        this.filterMembers.update((member) =>
          member.map((m) =>
            m.id === memberId
              ? {
                  ...m,
                  isActive: true,
                }
              : m,
          ),
        );
      },
      error: (error) => {
        console.error('Error adding member', error);
      },
    });
  }
}
