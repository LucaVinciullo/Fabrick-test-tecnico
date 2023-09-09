import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from 'fab-features/home/components/footer/footer.component';
import { HomeContainerComponent } from 'fab-features/home/containers/home-container/home-container.component';
import { HomeRoutingModule } from 'fab-features/home/home-routing.module';
import { SharedModule } from 'fab-shared/shared.module';

@NgModule({
  declarations: [
    HomeContainerComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ],
  exports: [],
})
export class HomeModule {
}
