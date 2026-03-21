import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ValidationBusService } from '../services/validation-bus.service';
import { ValidationResponse } from '../models/validation-error.model';

export const validationInterceptor: HttpInterceptorFn = (req, next) => {
  const validationBus = inject(ValidationBusService);

  // Clear server errors for any state-modifying requests before executing
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    validationBus.broadcast([]);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 400 && error.error?.Errors) {
        const response = error.error as ValidationResponse;

        validationBus.broadcast(response.Errors);
      }
      return throwError(() => error);
    })
  );
};
