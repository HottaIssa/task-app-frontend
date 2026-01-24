import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

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
  selector: 'app-task-card',
  imports: [DatePipe],
  templateUrl: './task-card.html',
  styles: ``,
})
export class TaskCard {
  task = input.required<Task>();
}
