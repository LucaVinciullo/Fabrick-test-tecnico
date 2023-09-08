import { Component, Input } from '@angular/core';

@Component({
  selector: 'fab-base-feature-container',
  templateUrl: './base-feature-container.component.html',
  styleUrls: ['./base-feature-container.component.scss'],
})
export class BaseFeatureContainerComponent {
  @Input() title = '';
}
