import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InquiryContainerComponent } from 'fab-features/inquiry/containers/inquiry-container/inquiry-container.component';
import { InquiryRoutingModule } from 'fab-features/inquiry/inquiry-routing.module';
import { InquiryFacadeService } from 'fab-features/inquiry/services/inquiry.facade.service';
import { SharedModule } from 'fab-shared/shared.module';

@NgModule({
  declarations: [
    InquiryContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InquiryRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    InquiryFacadeService,
  ],
})
export class InquiryModule {
}
