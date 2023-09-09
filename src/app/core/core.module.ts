import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserApiService } from 'fab-core/api/services/user.api.service';
import { HttpService } from 'fab-core/http/services/http.service';
import { LoaderService } from 'fab-core/loader/services/loader.service';
import { NotificationService } from 'fab-core/notification/services/notification.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
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
        NotificationService,
        HttpService,
        UserApiService,
      ],
    };
  }
}
