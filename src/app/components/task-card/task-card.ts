import { DatePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { TaskCardResponse } from '../../types/U';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe],
  templateUrl: './task-card.html',
  styles: ``,
})
export class TaskCard {
  task = input.required<TaskCardResponse>();
  isTaskInfoOpen = signal(false);
  route = inject(ActivatedRoute);
  router = inject(Router);

  openTaskInfo(){
    this.isTaskInfoOpen.set(true);
    this.router.navigate(['task', this.task().id], {
      relativeTo: this.route,
    });
  }

  readonly colorMap: Record<string, string> = {
    High: 'bg-[#FEE2E2] text-[#EF4444]',
    Medium: 'bg-[#FEF9C3] text-[#EAB308]',
    Low: 'bg-[#DCFCE7] text-[#22C55E]',
  };
}
