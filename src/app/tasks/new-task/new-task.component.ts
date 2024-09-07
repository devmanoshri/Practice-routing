import { Component, inject, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TasksService } from '../tasks.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // enteredDate = signal('');

  taskForm = new FormGroup({
    enteredTitle: new FormControl('', { validators: [Validators.required] }),
    enteredSummary: new FormControl('', { validators: [Validators.required] }),
    enteredDate: new FormControl('', { validators: [Validators.required] }),
  });

  get titleIsInvalid() {
    return (
      this.taskForm.controls.enteredTitle.touched &&
      this.taskForm.controls.enteredTitle.dirty &&
      this.taskForm.controls.enteredTitle.invalid
    );
  }
  get summaryIsInvalid() {
    return (
      this.taskForm.controls.enteredSummary.touched &&
      this.taskForm.controls.enteredSummary.dirty &&
      this.taskForm.controls.enteredSummary.invalid
    );
  }

  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    const formData = this.taskForm.value;
    console.log(formData);

    this.tasksService.addTask(
      {
        title: formData.enteredTitle ?? '',
        summary: formData.enteredSummary ?? '',
        date: formData.enteredDate ?? '',
      },
      this.userId()
    );
    this.router.navigate(['users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
  }
}
