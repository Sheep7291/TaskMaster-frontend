import {Component, inject} from '@angular/core';
import {Task} from '../../task.model';
import {DatePipe} from '@angular/common';
import {TaskService} from '../../task.service';
import {TaskFormComponent} from '../task-form/task-form.component';

const emptyTask = {
  name: '',
  description: '',
  dueDate: new Date(),
  completed: false,
  project: 0,
  id: 0
}

@Component({
  selector: 'app-task-list',
  imports: [
    DatePipe, TaskFormComponent
  ],
  templateUrl: './task-list.component.html',
  standalone: true,
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {


  tasks: Task[] = [];
  showModal = false
  selectedTask: Task = emptyTask
  formType: "CREATE" | "UPDATE" = 'CREATE';


  private taskService = inject(TaskService)

  constructor() {
    this.tasks = this.taskService.getTasks();
  }

  handleCheckbox(id: number){
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    const updatedTask = this.tasks[taskIndex];
    updatedTask.completed = !updatedTask.completed;
    this.tasks = this.taskService.updateTask(updatedTask);
  }

deleteTask(id: number){
    this.tasks = this.taskService.deleteTask(id);
}

  updateTask(task: Task) {
    this.selectedTask = task;
    this.formType= 'UPDATE';
    this.showModal = true;



  }
}
