import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home'
import { authGuard } from './guards/auth-guard';
import { publicGuard } from './guards/public-guard';
import { Project } from './pages/project/project';
import { Tasks } from './pages/tasks/tasks';
import { Profile } from './pages/profile/profile';
import { TaskInfo } from './components/task-info/task-info';
import { MainLayout } from './layouts/main-layout/main-layout';
import { EmptyLayout } from './layouts/empty-layout/empty-layout';
import { PersonalLayout } from './layouts/personal-layout/personal-layout';
import { Invitations } from './pages/invitations/invitations';
import { ArchivedProjects } from './pages/archived-projects/archived-projects';
import { SidebarLayout } from './layouts/sidebar-layout/sidebar-layout';
import { History } from './pages/history/history';

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
        component: SidebarLayout,
        children: [
          {
            path: '',
            title: 'Home | SaiDone',
            component: Home,
            canActivate: [authGuard],
          },
          {
            path: 'tasks',
            title: 'Tasks | SaiDone',
            component: Tasks,
            canActivate: [authGuard],
          },
        ],
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
      {
        path: 'archived-projects',
        title: 'Archived Projects | SaiDone',
        component: ArchivedProjects,
        canActivate: [authGuard],
      },
      {
        path: 'invitations',
        title: 'Invitations | SaiDone',
        component: Invitations,
        canActivate: [authGuard],
      },
      {
        path: 'history',
        title: 'History | SaiDone',
        component: History,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/a/login',
  },
];
