import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home'
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: Login
  },
  {
    path: 'register',
    title: 'Register',
    component: Register
  },
  {
    path: '',
    title: 'home',
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
