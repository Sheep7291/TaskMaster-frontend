import {Component, inject} from '@angular/core';
import {Task} from '../../task.model';
import {AsyncPipe, DatePipe} from '@angular/common';
import {TaskService} from '../../task.service';
import {TaskFormComponent} from '../task-form/task-form.component';
import {Observable} from 'rxjs';

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
    DatePipe, TaskFormComponent, AsyncPipe
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
  tasks$!: Observable<Task[]>;


  private taskService = inject(TaskService)

  constructor() {
    this.updateTasks();
  }

  updateTasks(){
    this.tasks$= this.taskService.getTasks();
  }

  handleCheckbox(id: number){
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    const updatedTask = this.tasks[taskIndex];
    updatedTask.completed = !updatedTask.completed;
    this.taskService.updateTask(updatedTask);
  }

deleteTask(id: number){
    this.taskService.deleteTask(id).subscribe(()=>{
      this.updateTasks()
    })
}

  addNewTask() {
    this.selectedTask = emptyTask;
    this.formType = 'CREATE';
    this.showModal = true;
  }

  updateTask(task: Task) {
    this.selectedTask = task;
    this.formType= 'UPDATE';
    this.showModal = true;

  }

  handleModalClose(type: 'SUBMIT' | 'CANCEL') {
    if(type === 'SUBMIT'){
      this.updateTasks()
    }
    this.showModal = false;

  }
}
