import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'fab-shared/shared.module';
import { RegistrationContainerComponent } from 'src/app/feature-modules/registration/containers/registration-container/registration-container.component';
import { RegistrationFacadeService } from 'src/app/feature-modules/registration/services/registration.facade.service';
import { RegistrationRoutingModule } from 'src/app/feature-modules/registration/registration-routing.module';

@NgModule({
  declarations: [
    RegistrationContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  providers: [
    RegistrationFacadeService,
  ],
})
export class RegistrationModule {
}
