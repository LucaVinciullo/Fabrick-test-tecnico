import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { LoaderService } from './loader/services/loader.service';
import { HttpService } from './http/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { UserApiService } from './api/services/user.api.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        LoaderService,
        HttpService,
        UserApiService,
      ],
    };
  }
}
