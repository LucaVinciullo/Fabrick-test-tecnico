import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'fab-shared/shared.module';
import { InquiryContainerComponent } from './containers/inquiry-container/inquiry-container.component';
import { InquiryRoutingModule } from './inquiry-routing.module';

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
