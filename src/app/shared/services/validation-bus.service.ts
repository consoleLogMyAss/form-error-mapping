import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { TValidationError, TValidationEvent } from '../models/validation-error.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationBusService {
  public validationErrors$: Subject<TValidationEvent> = new Subject<TValidationEvent>();

  public broadcast(errors: TValidationError[], form: FormGroup = null): void {
    this.validationErrors$.next({ errors, form });
  }
}
