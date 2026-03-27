import { HttpContextToken } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

export interface TValidationError {
  Path: string;
  Message: string;
}

export interface TValidationResponse {
  Errors: TValidationError[];
}

export interface TValidationEvent {
  errors: TValidationError[];
  form: FormGroup;
}

export type TGroupedErrors = Record<string, Record<string, string>>;


export const VALIDATION_FORM = new HttpContextToken<FormGroup>(() => null);
