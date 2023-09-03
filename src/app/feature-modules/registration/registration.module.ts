import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'fab-shared/shared.module';
import { RegistrationContainerComponent } from './containers/registration-container/registration-container.component';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
  declarations: [
    RegistrationContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegistrationRoutingModule,
  ],
  providers: [],
})
export class RegistrationModule {
}
