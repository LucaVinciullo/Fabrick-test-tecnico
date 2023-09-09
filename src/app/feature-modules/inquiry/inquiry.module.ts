import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserAttributeComponent } from 'fab-features/inquiry/components/user-attribute/user-attribute.component';
import { InquiryContainerComponent } from 'fab-features/inquiry/containers/inquiry-container/inquiry-container.component';
import { InquiryRoutingModule } from 'fab-features/inquiry/inquiry-routing.module';
import { InquiryFacadeService } from 'fab-features/inquiry/services/inquiry.facade.service';
import { SharedModule } from 'fab-shared/shared.module';

@NgModule({
  declarations: [
    InquiryContainerComponent,
    UserAttributeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InquiryRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [
    InquiryFacadeService,
  ],
})
export class InquiryModule {
}
