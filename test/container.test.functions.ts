import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestModuleMetadata } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'fab-shared/shared.module';
import { of } from 'rxjs';


const TranslateLoaderMock = {
  getTranslation(arg: string) {
    return of(arg);
  },
};

export function containerTestModuleBaseConfiguration(specificContainerConfig: TestModuleMetadata): TestModuleMetadata {
  return {
    ...specificContainerConfig,
    imports: [
      ...(specificContainerConfig.imports ? specificContainerConfig.imports : []),
      BrowserModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en',
      }),
      RouterTestingModule,
      HttpClientTestingModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
    ],
    providers: [
      ...(specificContainerConfig.providers ? specificContainerConfig.providers : []),
      { provide: TranslateLoader, useValue: TranslateLoaderMock },
    ],
  };
}
