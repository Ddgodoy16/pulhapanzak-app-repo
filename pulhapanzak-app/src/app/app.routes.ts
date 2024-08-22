import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register-page',
    loadComponent: () => import('./register-page/register-page.page').then( m => m.RegisterPagePage)
  },
  {
    path: 'register-page',
    loadComponent: () => import('./register-page/register-page.page').then( m => m.RegisterPagePage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
];
