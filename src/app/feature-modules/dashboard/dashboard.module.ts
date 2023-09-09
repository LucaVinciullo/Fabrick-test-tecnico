import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeatureCardComponent } from 'fab-features/dashboard/components/feature-card/feature-card.component';
import {
  DashboardContainerComponent,
} from 'fab-features/dashboard/containers/dashboard-container/dashboard-container.component';
import { DashboardRoutingModule } from 'fab-features/dashboard/dashboard-routing.module';
import { SharedModule } from 'fab-shared/shared.module';

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
