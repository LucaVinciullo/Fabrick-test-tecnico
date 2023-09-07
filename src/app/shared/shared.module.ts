import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BaseFeatureContainerComponent } from 'fab-shared/components/base-feature-container/base-feature-container.component';
import { HeaderComponent } from 'fab-shared/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatIconModule,
  ],
  declarations: [
    HeaderComponent,
    BaseFeatureContainerComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    BaseFeatureContainerComponent,
  ],
})
export class SharedModule {
}
