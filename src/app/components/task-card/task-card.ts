import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { TaskCardResponse } from '../../types/U';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './task-card.html',
  styles: ``,
})
export class TaskCard {
  task = input.required<TaskCardResponse>();
  route = inject(ActivatedRoute);
  router = inject(Router);

  readonly colorMap: Record<string, string> = {
    High: 'bg-[#FEE2E2] text-[#EF4444]',
    Medium: 'bg-[#FEF9C3] text-[#EAB308]',
    Low: 'bg-[#DCFCE7] text-[#22C55E]',
  };
}
