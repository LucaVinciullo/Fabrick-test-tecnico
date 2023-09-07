import { GenderType } from 'src/app/feature-modules/registration/model/gender.type';
import { StatusType } from 'src/app/feature-modules/registration/model/status.type';
export interface UserFormValue {
  name: string | null,
  gender: GenderType | null,
  email: string | null,
  status: StatusType | null,
}
