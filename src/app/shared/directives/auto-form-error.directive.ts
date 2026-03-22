import { Directive, OnInit, inject, DestroyRef } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {map, take, takeUntil} from 'rxjs';
import { ValidationBusService } from '../services/validation-bus.service';
import { ValidationError } from '../models/validation-error.model';

@Directive({
  selector: '[formGroup]',
})
export class AutoFormErrorDirective implements OnInit {
  private formGroupDirective: FormGroupDirective = inject(FormGroupDirective);
  private validationBus: ValidationBusService = inject(ValidationBusService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.validationBus.validationErrors$.pipe(
      map((errors: ValidationError[]) => {
        return errors.filter(error => Boolean(error.Path))
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((errors) => this.applyErrors(errors));
  }

  private applyErrors(errors: ValidationError[]): void {
    const groupedErrors = errors.reduce((acc, err) => {
      if (!acc[err.Path]) {
        acc[err.Path] = [];
      }

      acc[err.Path].push(err.Message);

      return acc;
    }, {} as Record<string, string[]>);

    Object.keys(groupedErrors).forEach((path) => {
      const control: AbstractControl = this.formGroupDirective.form.get(path);

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
