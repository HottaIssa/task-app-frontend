import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  Input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Column, TaskCardResponse, TaskRequest } from '../../types/U';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styles: ``,
})
export class TaskForm implements OnInit {
  column = input.required<Column>();
  projectId = signal<string>('');
  taskForm = signal<TaskRequest>({} as TaskRequest);
  status = computed(() => this.column().statusName ?? '');

  title: string = '';
  description: string = '';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';

  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  taskCreated = output<TaskCardResponse>();

  onClose = output<void>();
  private elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId.set(params.get('id') ?? '');
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.title.trim() === '') {
        this.onClose.emit();
        return;
      }
      this.taskForm.set({
        title: this.title,
        description: this.description,
        priority: this.priority,
        projectId: this.projectId(),
        status: this.status(),
      });
      this.loadData(this.taskForm());
    }
  }

  loadData(data: TaskRequest) {
    this.taskService.createTask(data).subscribe({
      next: (data) => {
        this.taskCreated.emit(data);
        this.onClose.emit();
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }
}
