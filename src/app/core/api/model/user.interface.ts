import { ɵFormGroupRawValue } from '@angular/forms';
import { UserFormInterface } from 'src/app/feature-modules/registration/model/user-form.interface';

type NonNullableInterface<T> = {
  [P in keyof T]: NonNullable<T[P]>
};

export interface UserInterface extends NonNullableInterface<ɵFormGroupRawValue<UserFormInterface>> {
  id: number,
}
