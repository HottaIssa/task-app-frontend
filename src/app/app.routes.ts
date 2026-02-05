import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home'
import { authGuard } from './guards/auth-guard';
import { publicGuard } from './guards/public-guard';
import { Project } from './pages/project/project';
import { Tasks } from './pages/tasks/tasks';
import { Profile } from './components/profile/profile';
import { TaskInfo } from './components/task-info/task-info';
import { MainLayout } from './layouts/main-layout/main-layout';
import { EmptyLayout } from './layouts/empty-layout/empty-layout';
import { PersonalLayout } from './layouts/personal-layout/personal-layout';

export const routes: Routes = [
  {
    path: 'a',
    component: EmptyLayout,
    canActivate: [publicGuard],
    children: [
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
    ],
  },
  {
    path: 'p',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Home | SaiDone',
        component: Home,
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        title: 'Profile | SaiDone',
        component: Profile,
        canActivate: [authGuard],
      },
      {
        path: 'tasks',
        title: 'Tasks | SaiDone',
        component: Tasks,
        canActivate: [authGuard],
      },
      {
        path: ':id',
        title: 'Project Details | SaiDone',
        component: Project,
        canActivate: [authGuard],
        children: [
          {
            path: 't/:id',
            component: TaskInfo,
            outlet: 'modal',
          },
        ],
      },
      {
        path: '**',
        redirectTo: '/p',
      },
    ],
  },
  {
    path: 'u/:id',
    component: PersonalLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        title: 'Profile | SaiDone',
        component: Profile,
        canActivate: [authGuard],
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/a/login',
  },
];
