import { Component, Input } from '@angular/core';

@Component({
  selector: 'fab-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() hasDashboardLink = true;
}
