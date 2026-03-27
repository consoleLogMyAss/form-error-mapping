import {FormArray, FormControl, FormGroup} from '@angular/forms';

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


  public formArr: FormGroup = new FormGroup({
    animal: new FormControl(''),
    sounds: new FormArray([
      new FormGroup({
        pips: new FormControl(''),
        pops: new FormControl(''),
      }),
      new FormGroup({
        pips: new FormControl(''),
        pops: new FormControl(''),
      }),
      new FormGroup({
        pips: new FormControl(''),
        pops: new FormControl(''),
      }),
    ])
  })
}
