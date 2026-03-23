import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ValidationError, ValidationEvent } from '../models/validation-error.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationBusService {
  public validationErrors$: Subject<ValidationEvent> = new Subject<ValidationEvent>();

  public broadcast(errors: ValidationError[], form: FormGroup = null): void {
    this.validationErrors$.next({ errors, form });
  }
}
