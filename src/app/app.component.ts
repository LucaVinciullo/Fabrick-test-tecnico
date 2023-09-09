import { Component } from '@angular/core';
import { LoaderService } from 'fab-core/loader/services/loader.service';

@Component({
  selector: 'fab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  isLoaderVisible$ = this.loaderService.isLoaderVisible$;

  constructor(private loaderService: LoaderService) {
  }
}
