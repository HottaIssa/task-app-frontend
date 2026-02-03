import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { TaskCardResponse, TaskFilters } from '../../types/U';
import { DatePipe } from '@angular/common';
import { DropdownLayout } from "../../components/dropdown-layout/dropdown-layout";
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [DatePipe, DropdownLayout, FormsModule],
  templateUrl: './tasks.html',
  styles: ``,
})
export class Tasks implements OnInit {
  filters: TaskFilters = {};
  isActive = '1';
  isModalOpen = signal(false);
  tasks = signal<TaskCardResponse[]>([]);
  private projectService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  selectedStatus: string = '';
  selectedPriority: string = '';
  searchText: string = '';
  dueFrom: string = '';
  dueTo: string = '';
  isOverdue: boolean = false;
  priorityList = ['LOW', 'MEDIUM', 'HIGH'];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.filters = params;
      this.loadData(this.filters);
    });
  }

  setStatusName(name: string) {
    if (name == 'TODO') return 'Todo'
    if (name == 'IN_PROGRESS') return 'In Progress';
    if (name == 'IN_REVIEW') return 'In Review';
    if (name == 'DONE') return 'Done';

    return '';
  }

  setBgPriority(priority: string) {
    if(priority == 'High') return '#FEE2E2';
    if(priority == 'Medium') return '#FEF9C3';
    if(priority == 'Low') return '#DCFCE7';
    return '#FFFFFF';
  }

  search() {
    this.applyFilters();
  }

  setActive(option: string) {
    this.clearFilters()
    this.isActive = option;
    if (option === '2') {
      this.filters = {
        isAssignedToMe: true,
      };
    } else if (option === '3') {
      this.filters = {
        isCreatedByMe: true,
      };
    } else {
      this.filters = {};
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filters,
    });
  }

  applyFilters() {
    const newFilters: TaskFilters = {};

    if (this.filters.isAssignedToMe) {
      newFilters.isAssignedToMe = this.filters.isAssignedToMe;
    }

    if (this.filters.isCreatedByMe) {
      newFilters.isCreatedByMe = this.filters.isCreatedByMe;
    }

    if (this.dueFrom && this.dueFrom != '') {
      newFilters.dueFrom = this.dueFrom;
    }

    if (this.isOverdue) {
      newFilters.isOverdue = this.isOverdue;
    }

    if (this.dueTo && this.dueTo != '') {
      newFilters.dueTo = this.dueTo;
    }

    if (this.searchText && this.searchText != '') {
      newFilters.search = this.searchText;
    }

    if (this.selectedStatus && this.selectedStatus != '') {
      newFilters.status = this.selectedStatus;
    }

    if (this.selectedPriority && this.selectedPriority != '') {
      newFilters.priority = this.selectedPriority;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newFilters,
    });
  }

  clearFilters() {
    this.selectedStatus= '';
    this.selectedPriority= '';
    this.searchText= '';
    this.dueFrom= '';
    this.dueTo= '';
    this.isOverdue = false;
  }

  loadData(filters: TaskFilters) {
    this.projectService.getTasks(filters).subscribe((response) => {
      this.tasks.set(response.content);
    });
  }
}
