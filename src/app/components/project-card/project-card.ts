import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styles: ``,
})
export class ProjectCard {
  project = input.required<Project>();

}
