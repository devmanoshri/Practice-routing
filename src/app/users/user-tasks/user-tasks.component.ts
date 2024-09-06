import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from './../users.service';
import { Component, computed, inject, input } from '@angular/core';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input.required<string>();

  private userService = inject(UsersService);
  userName = computed(
    () => this.userService.users.find((user) => user.id === this.userId())?.name
  );
}
