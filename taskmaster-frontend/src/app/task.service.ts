import { Injectable } from '@angular/core';
import {Task} from './task.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const BASE_URL = 'http://localhost:8081/api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
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

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${BASE_URL}/tasks`);
  }

  addTask(task: Task) {
    return this.http.post(`${BASE_URL}/tasks`, { ...task, project: null, id: null });
  }

  // updateTask
  updateTask(newTask: Task) {
    return this.http.put(`${BASE_URL}/tasks/${newTask.id}`, {
      ...newTask,
      project: null,
    });
  }

  deleteTask(id: number){
    return this.http.delete(`${BASE_URL}/tasks/${id}`);
}
}
