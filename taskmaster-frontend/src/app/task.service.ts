import { Injectable } from '@angular/core';
import {Task} from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  tasks: Task[] = [{
    id: 1,
    name: 'Desigg wireframe',
    description: '',
    completed: false,
    dueDate: new Date("2023-07-31"),
    project: 1
  },
    {
      id: 2,
      name: 'Desigg frontend',
      description: '',
      completed: true,
      dueDate: new Date("2023-06-15"),
      project: 1
    },
    {
      id: 3,
      name: 'Implementing backend',
      description: '',
      completed: false,
      dueDate: new Date("2023-08-31"),
      project: 1
    },];

  getTasks(){
    return this.tasks
  }

  addTask(task: Task){
    this.tasks.push(task);
    return this.tasks;
  }

  updateTask(newTask: Task){
    const taskIndex = this.tasks.findIndex(task => task.id === newTask.id);
    this.tasks[taskIndex] = newTask
    return this.tasks;
  }

  deleteTask(id: number){
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(taskIndex, 1);
    return this.tasks;
}
}
