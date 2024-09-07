import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  UserTasksComponent,
  resolveTitle,
  resolveUserName,
} from './users/user-tasks/user-tasks.component';
//import { routes as userRoutes } from './users/users.routes';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No Task',
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    loadChildren:()=>import('./users/users.routes').then((mod)=>mod.routes),
    //children: userRoutes,
    data: { message: 'Hello!' },
    resolve: { userName: resolveUserName },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
