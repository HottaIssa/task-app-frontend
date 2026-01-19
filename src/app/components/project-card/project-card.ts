import { Component, Input } from '@angular/core';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  createdBy: string;
}

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styles: ``,
})
export class ProjectCard {
  @Input() project!: Project;

}
