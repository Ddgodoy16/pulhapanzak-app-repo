import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from './Auth/guards/auth-guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Auth/Pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./Auth/Pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [() => inject(AuthGuard).canActivate()],

  },
  // Redirección por defecto en caso de una ruta no encontrada
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
