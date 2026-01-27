import { DatePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { TaskCardResponse } from '../../types/U';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe],
  templateUrl: './task-card.html',
  styles: ``,
})
export class TaskCard {
  task = input.required<TaskCardResponse>();

  readonly colorMap: Record<string, string> = {
    High: 'bg-[#FEE2E2] text-[#EF4444]',
    Medium: 'bg-[#FEF9C3] text-[#EAB308]',
    Low: 'bg-[#DCFCE7] text-[#22C55E]',
  };
}
