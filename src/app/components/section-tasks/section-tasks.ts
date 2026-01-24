import { Component, input} from '@angular/core';
import { TaskCard } from "../task-card/task-card";

export interface Column {
  statusId: number;
  statusName: string;
  statusColor: string;
  orderIndex: number;
  taskCount: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  isOverdue: boolean;
  assignedTo: {
    id: string;
    username: string;
    email: string;
  };
}

@Component({
  selector: 'app-section-tasks',
  imports: [TaskCard],
  templateUrl: './section-tasks.html',
  styles: ``,
})
export class SectionTasks {
  column = input.required<Column>();
}
