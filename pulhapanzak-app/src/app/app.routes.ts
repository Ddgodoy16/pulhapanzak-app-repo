import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
 
  {
    path: 'register',
    loadComponent: () => import('./Auth/Pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./Auth/Pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./gallery/pages/gallery/gallery.page').then( m => m.GalleryPage)
  },


];
