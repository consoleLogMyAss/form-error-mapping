import { FormControl, FormGroup } from '@angular/forms';

export class FormService {
  public form = new FormGroup({
    carName: new FormControl(''),
    model: new FormControl(''),
    charcter: new FormGroup({
      color : new FormControl(''),
      speed : new FormControl(''),
    }),

  });


  public formData = new FormGroup({
    title: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
  });
}
