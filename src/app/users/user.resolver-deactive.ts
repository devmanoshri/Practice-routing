import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Task } from "../tasks/task/task.model";
import { TasksService } from "../tasks/tasks.service";


export const resolveUserTasks12: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const tasksService = inject(TasksService);
  const order = activatedRouteSnapshot.queryParams['order'];

  const userTasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    )
    .sort((a, b) => {
      if (order && order === 'desc') {
        return a.id > b.id ? -1 : 1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    });

  return userTasks;
};
