import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ValidationError } from '../models/validation-error.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationBusService {
  public validationErrors$: Subject<ValidationError[]> = new Subject<ValidationError[]>();

  public broadcast(errors: ValidationError[]): void {
    this.validationErrors$.next(errors);
  }
}
