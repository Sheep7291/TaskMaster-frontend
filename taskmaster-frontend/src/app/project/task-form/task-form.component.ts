import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Task} from '../../task.model';
import {TaskService} from '../../task.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  standalone: true,
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnChanges{

  @Input() currentTask: Task | null = null;
  @Input() formType: 'CREATE' | 'UPDATE' = 'CREATE';
  @Output() closePanel = new EventEmitter<'SUBMIT' | 'CANCEL'>();
  taskForm: FormGroup;

  private taskService = inject(TaskService)

  constructor(private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      dueDate: ['', [Validators.required]],
      id: [0],
      project: [0]
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentTask'] && changes['currentTask'].currentValue) {
      const task = changes['currentTask'].currentValue as Task;

      const dueDateFormatted = task.dueDate
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : '';

      this.taskForm.patchValue({
        ...task,
        dueDate: dueDateFormatted,
      });
    }
  }


  handleSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        dueDate: new Date(this.taskForm.value.dueDate),
        completed:
          this.formType === 'UPDATE' ? this.taskForm.value.completed : false,
      };

      if (this.formType === 'CREATE') {
        this.taskService.addTask(newTask)
        }
      else {
        this.taskService.updateTask(newTask)
        }
      this.closePanel.emit('SUBMIT');
      }
    }

  handleCancel() {
    this.closePanel.emit('CANCEL');
  }
}


