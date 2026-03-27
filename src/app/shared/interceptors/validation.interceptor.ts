import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ValidationBusService } from '../services/validation-bus.service';
import { VALIDATION_FORM, TValidationResponse } from '../models/validation-error.model';

export const validationInterceptor: HttpInterceptorFn = (req, next) => {
  const validationBus = inject(ValidationBusService);
  const form = req.context.get(VALIDATION_FORM);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 400 && error.error?.Errors) {
        const response = error.error as TValidationResponse;

        validationBus.broadcast(response.Errors, form);
      }

      return throwError(() => error);
    })
  );
};
