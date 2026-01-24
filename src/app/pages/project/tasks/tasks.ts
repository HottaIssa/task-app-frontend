import { Component, inject, input, OnInit } from '@angular/core';
import { SectionTasks } from "../../../components/section-tasks/section-tasks";
import { Project } from '../../../services/project';

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
  selector: 'app-tasks',
  imports: [SectionTasks],
  templateUrl: './tasks.html',
  styles: ``,
})
export class Tasks {
  columns = input.required<Column[]>();

}
