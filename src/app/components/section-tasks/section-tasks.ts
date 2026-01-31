import { Component, inject, input, signal} from '@angular/core';
import { TaskCard } from "../task-card/task-card";
import { Column, TaskCardResponse } from '../../types/U';
import { TaskForm } from "../task-form/task-form";
import { ProjectContextService } from '../../services/project-context-service';

@Component({
  selector: 'app-section-tasks',
  imports: [TaskCard, TaskForm],
  templateUrl: './section-tasks.html',
  styles: ``,
})
export class SectionTasks {
  column = input.required<Column>();
  isTaskFormOpen = signal(false);
  columnName: string = '';
  authProject = inject(ProjectContextService);

  openTaskForm() {
    this.isTaskFormOpen.set(true);
  }

  setColumnName(name: string) {
    if (name == 'TODO') {
      this.columnName = 'Backlog';
    } else if (name == 'IN_PROGRESS') {
      this.columnName = 'In Progress';
    } else if (name == 'IN_REVIEW') {
      this.columnName = 'In Review';
    } else if (name == 'DONE') {
      this.columnName = 'Done';
    }

    return this.columnName;
  }

  onTaskCreated(task: TaskCardResponse) {
    this.column().tasks.unshift(task);
  }
}
