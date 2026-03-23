import { Directive, OnInit, inject, DestroyRef } from '@angular/core';
import {AbstractControl, FormGroup, FormGroupDirective} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, take, takeUntil } from 'rxjs';
import { ValidationBusService } from '../services/validation-bus.service';
import { ValidationError, ValidationEvent } from '../models/validation-error.model';

@Directive({
  selector: '[formGroup]',
})
export class AutoFormErrorDirective implements OnInit {
  private formGroupDirective: FormGroupDirective = inject(FormGroupDirective);
  private validationBus: ValidationBusService = inject(ValidationBusService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.validationBus.validationErrors$.pipe(
      map((event: ValidationEvent) => {
        return {
          errors:  event.errors.filter(error => Boolean(error.Path)),
          form: event.form,
        }
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((event) => this.applyErrors(event));
  }

  private applyErrors(event: ValidationEvent): void {
    const errors: ValidationError[] = event.errors;
    const form: FormGroup = event.form || this.formGroupDirective.form;

    const groupedErrors = errors.reduce((acc, err) => {
      if (!acc[err.Path]) {
        acc[err.Path] = [];
      }

      acc[err.Path].push(err.Message);

      return acc;
    }, {} as Record<string, string[]>);

    Object.keys(groupedErrors).forEach((path) => {
      const control: AbstractControl = form.get(path);

      if (control) {
        control.setErrors({ [path]: groupedErrors[path] });
        control.markAsTouched();

        control.valueChanges
          .pipe(
            take(1),
            takeUntil(this.validationBus.validationErrors$),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(() => {
            control.setErrors(null);
          });
      }
    });
  }
}
