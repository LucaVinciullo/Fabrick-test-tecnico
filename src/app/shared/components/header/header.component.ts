import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fab-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  get isBackIconHidden(): boolean {
    return this.router.url.includes('dashboard');
  }

  constructor(private router: Router) {
  }
}
