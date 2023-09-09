import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiryContainerComponent } from 'fab-features/inquiry/containers/inquiry-container/inquiry-container.component';

const routes: Routes = [
  {
    path: '',
    component: InquiryContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquiryRoutingModule {
}
