import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'fab-shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeContainerComponent } from './containers/home-container/home-container.component';
import { FooterComponent } from './components/footer/footer.component';

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
  exports: [
  ],
})
export class HomeModule { }
