import { Component, Input } from '@angular/core';

@Component({
  selector: 'fab-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss'],
})
export class FeatureCardComponent {
  @Input({ required: true }) name = '';

  @Input({ required: true }) icon = '';
}
