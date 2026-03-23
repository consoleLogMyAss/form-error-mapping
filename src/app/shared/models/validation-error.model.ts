import { HttpContextToken } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

export interface ValidationError {
  Path: string;
  Message: string;
}

export interface ValidationResponse {
  Errors: ValidationError[];
}

export interface ValidationEvent {
  errors: ValidationError[];
  form: FormGroup | null;
}

export const VALIDATION_FORM = new HttpContextToken<FormGroup>(() => null);
