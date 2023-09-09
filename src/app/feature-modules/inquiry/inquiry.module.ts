import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InquiryContainerComponent } from 'fab-features/inquiry/containers/inquiry-container/inquiry-container.component';
import { InquiryRoutingModule } from 'fab-features/inquiry/inquiry-routing.module';
import { SharedModule } from 'fab-shared/shared.module';

@NgModule({
  declarations: [

    InquiryContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InquiryRoutingModule,
  ],
  providers: [],
})
export class InquiryModule {
}
