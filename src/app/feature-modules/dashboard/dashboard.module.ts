import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'fab-shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';

@NgModule({
  declarations: [
    DashboardContainerComponent,
    FeatureCardComponent,
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
