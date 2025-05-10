import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProjectComponent} from './project/project.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProjectComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taskmaster-frontend';
}
