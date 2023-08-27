import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DashboardContainerComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  providers: [],
})
export class DashboardModule {
}
