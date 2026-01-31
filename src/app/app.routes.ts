import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home'
import { authGuard } from './guards/auth-guard';
import { publicGuard } from './guards/public-guard';
import { Project } from './pages/project/project';
import { Tasks } from './pages/tasks/tasks';
import { Profile } from './components/profile/profile';
import { TaskCard } from './components/task-card/task-card';
import { TaskInfo } from './components/task-info/task-info';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: Login,
    canActivate: [publicGuard],
  },
  {
    path: 'register',
    title: 'Register',
    component: Register,
    canActivate: [publicGuard],
  },
  {
    path: '',
    title: 'Home | SaiDone',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'project/:id',
    title: 'Project Details | SaiDone',
    component: Project,
    canActivate: [authGuard],
    children: [
      {
        path: 'task/:id',
        component: TaskInfo
      }
    ]
  },
  {
    path: 'tasks',
    title: 'Tasks | SaiDone',
    component: Tasks,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
