import { Component, input} from '@angular/core';
import { TaskCard } from "../task-card/task-card";
import { Column } from '../../types/U';

@Component({
  selector: 'app-section-tasks',
  imports: [TaskCard],
  templateUrl: './section-tasks.html',
  styles: ``,
})
export class SectionTasks {
  column = input.required<Column>();
  columnName:string = '';

  setColumnName(name: string){
    if(name == 'TODO'){
      this.columnName = 'Backlog';
    }else if(name=='IN_PROGRESS'){
      this.columnName = 'In Progress';
    }else if(name=='IN_REVIEW'){
      this.columnName = 'In Review';
    }else if(name=='DONE'){
      this.columnName = 'Done';
    }

    return this.columnName
  }
}
