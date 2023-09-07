import { FormControl } from '@angular/forms';

export interface UserFormInterface {
  name: FormControl<string | null>,
  gender: FormControl<'male' | 'female' | 'non binary' | null>,
  email: FormControl<string | null>,
  status: FormControl<'active' | 'inactive' | null>,
}
