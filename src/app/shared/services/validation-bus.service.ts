import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ValidationError } from '../models/validation-error.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationBusService {
  private validationErrors$$ = new Subject<ValidationError[]>();
  public validationErrors$ = this.validationErrors$$.asObservable();

  public broadcast(errors: ValidationError[]): void {
    this.validationErrors$$.next(errors);
  }
}
