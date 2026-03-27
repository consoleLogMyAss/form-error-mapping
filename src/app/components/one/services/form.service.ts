import {FormControl, FormGroup, Validators} from '@angular/forms';

export class FormService {
  public form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    comment: new FormControl(''),
  });


  public formData = new FormGroup({
    title: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
  });
}
