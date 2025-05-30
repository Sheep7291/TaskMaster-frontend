import { Component } from '@angular/core';
import {ProjectTitleComponent} from './project-title/project-title.component';
import {TaskListComponent} from './task-list/task-list.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';

@Component({
  selector: 'app-project',
  imports: [
    ProjectTitleComponent,
    TaskListComponent,
    ProgressBarComponent
  ],
  templateUrl: './project.component.html',
  standalone: true,
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

}
