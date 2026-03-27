import { FormControl, FormGroup } from '@angular/forms';

export class FormService {
  public form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    comment: new FormControl(''),
  });


  public formData = new FormGroup({
    title: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
  });
}
