import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '*',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('fab-features/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'inquiry',
    loadChildren: () => import('fab-features/inquiry/inquiry.module').then(m => m.InquiryModule),
  },
  {
    path: 'registration',
    loadChildren: () => import('fab-features/registration/registration.module').then(m => m.RegistrationModule),
  },
  {
    path: 'home',
    loadChildren: () => import('fab-features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
