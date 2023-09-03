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
    loadChildren: () => import('src/app/feature-modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/feature-modules/home/home.module').then(m => m.HomeModule),
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
