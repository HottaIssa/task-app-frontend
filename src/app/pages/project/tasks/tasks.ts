import { Component, input } from '@angular/core';
import { SectionTasks } from "../../../components/section-tasks/section-tasks";
import { Column } from '../../../types/U';

@Component({
  selector: 'app-tasks',
  imports: [SectionTasks],
  templateUrl: './tasks.html',
  styles: ``,
})
export class Tasks {
  columns = input.required<Column[]>();

}
