import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  RegistrationContainerComponent,
} from 'fab-features/registration/containers/registration-container/registration-container.component';
import { RegistrationRoutingModule } from 'fab-features/registration/registration-routing.module';
import { RegistrationFacadeService } from 'fab-features/registration/services/registration.facade.service';
import { SharedModule } from 'fab-shared/shared.module';

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
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    ClipboardModule,
  ],
  providers: [
    RegistrationFacadeService,
  ],
})
export class RegistrationModule {
}
