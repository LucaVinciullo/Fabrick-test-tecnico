import { Component, Input } from '@angular/core';

@Component({
  selector: 'fab-user-attribute',
  templateUrl: './user-attribute.component.html',
})
export class UserAttributeComponent {
  @Input({ required: true }) name = '';

  @Input({ required: true }) value = '';
}
