import { GenderType } from 'fab-features/registration/model/gender.type';
import { StatusType } from 'fab-features/registration/model/status.type';

export interface UserFormValue {
  name: string | null,
  gender: GenderType | null,
  email: string | null,
  status: StatusType | null,
}

