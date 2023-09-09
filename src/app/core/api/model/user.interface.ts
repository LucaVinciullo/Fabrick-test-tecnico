import { UserFormValue } from 'fab-features/registration/model/user-form-value.interface';

type NonNullableInterface<T> = {
  [P in keyof T]: NonNullable<T[P]>
};

export interface User extends NonNullableInterface<UserFormValue> {
  id: number,
}

