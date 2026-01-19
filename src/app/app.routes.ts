import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home'
import { authGuard } from './guards/auth-guard';
import { publicGuard } from './guards/public-guard';

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
    path: '**',
    redirectTo: '/login',
  },
];
