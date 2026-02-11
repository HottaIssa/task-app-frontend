import { Component, inject, OnInit, output, signal } from '@angular/core';
import { ModalLayout } from '../modal-layout/modal-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task-service';
import { Member, Status, TaskResponse, TaskUpdateRequest } from '../../types/U';
import { DatePipe } from '@angular/common';
import { ProjectContextService } from '../../services/project-context-service';
import { AuthService } from '../../services/auth-service';
import { CommentChat } from '../comment-chat/comment-chat';
import { FormsModule } from '@angular/forms';
import { FloatingDropdown } from "../floating-dropdown";
import { MemberService } from '../../services/member-service';

@Component({
  selector: 'app-task-info',
  imports: [ModalLayout, DatePipe, CommentChat, FormsModule, FloatingDropdown],
  templateUrl: './task-info.html',
  styles: ``,
})
export class TaskInfo implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  taskId = signal('');
  taskService = inject(TaskService);
  task = signal<TaskResponse | null>(null);
  authProject = inject(ProjectContextService);
  auth = inject(AuthService);
  isOpenMembers = signal(false);

  title = signal('');
  statusId = signal(1);
  description = signal('');
  projectId = signal('');
  priority = signal('');
  status = signal<Status>({} as Status);
  dueDate = signal<Date | null>(null);
  assignedTo = signal<{
    id: string;
    username: string;
    email: string;
    avatar_url: string |null;
  } | null>(null);

  taskUpdated = output<TaskResponse>();

  buttonMessage(status: number) {
    if (status == 1) return 'Start';
    if (status == 2) return 'To Review';
    if (status == 3) return 'Complete';
    return '';
  }

  taskInfoClosed() {
    this.router.navigate(['../..'], {
      relativeTo: this.route,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;

      this.taskId.set(id);
      this.loadData(id);
    });
  }

  setStatusName(id: number) {
    if (id == 1) return 'Todo';
    if (id == 2) return 'In Progress';
    if (id == 3) return 'In Review';
    if (id == 4) return 'Done';

    return '';
  }

  readonly colorMap: Record<string, string> = {
    High: 'bg-[#FEE2E2] text-[#EF4444]',
    Medium: 'bg-[#FEF9C3] text-[#EAB308]',
    Low: 'bg-[#DCFCE7] text-[#22C55E]',
  };

  loadData(id: string) {
    this.taskService.getTask(id).subscribe({
      next: (data) => {
        this.task.set(data);
        this.statusId.set(data.status.id);
        this.title.set(data.title);
        this.description.set(data.description);
        this.priority.set(data.priority);
        this.status.set(data.status);
        this.dueDate.set(data.dueDate);
        this.assignedTo.set(data.assignedTo);
        this.projectId.set(data.projectId);
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }

  updateTask(taskId: string, task: TaskUpdateRequest){
    if(task.title != undefined && (task.title == '' || (task.title == this.task()?.title))) return
    if (task.priority != undefined &&  task.priority == this.task()?.priority?.toUpperCase()) return;
    if (task.description != undefined && task.description == this.task()?.description) return;
    if (task.dueDate != undefined && task.dueDate == this.task()?.dueDate) return;

    this.taskService.updateTask(taskId, task ).subscribe({
      next: (data) => {
        this.taskService.notifyActualization(data);

      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }

  public updateTaskMember(memberId: string) {
    if((memberId == this.task()?.assignedTo?.id) || !memberId) return
    this.taskService.updateTaskMember(this.taskId(), { memberId }).subscribe({
      next: (data) => {
        this.taskService.notifyActualization(data);
        this.assignedTo.set(data.assignedTo);
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }

  public updateTaskStatus() {
    this.taskService.updateTaskStatus(this.taskId()).subscribe({
      next: (data) => {
        this.taskService.notifyActualization(data);
        this.statusId.set(this.statusId() + 1);

      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }

  memberService = inject(MemberService);

  members = signal<Member[]>([]);

  filteredMembers = signal<Member[]>([]);

  searchTerm = signal('');

  openMembers(){
    this.isOpenMembers.set(!this.isOpenMembers());
    this.loadMembers();
  }

  searchMembers(searchTerm: string) {
    this.filteredMembers.set(searchTerm.trim() ?
      this.members().filter((member) =>
        member.user.username.toLowerCase().includes(searchTerm.toLowerCase()),
      ) : this.members(),
    );
  }

  loadMembers(){
    this.memberService.getMembersByProject(this.projectId()).subscribe({
      next: (data) => {
        this.members.set(data.filter(m => m.isActive === true));
        this.filteredMembers.set(this.members());
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }

  isDeleteModalOpen = signal(false);
  deleteTask(id:string){
    this.taskService.deleteTask(id).subscribe({
      next: (data) => {
        this.taskService.notifyDelete("Task deleted");
        this.isDeleteModalOpen.set(false);
        this.taskInfoClosed();
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }
}
