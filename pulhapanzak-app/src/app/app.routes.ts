import { Routes } from '@angular/router';

export const routes: Routes = [
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
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
     },
  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
