import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatIconModule,
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    HeaderComponent,
  ],
})
export class SharedModule {
}
