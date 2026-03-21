import { Directive, OnInit, inject, DestroyRef } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take, takeUntil } from 'rxjs';
import { ValidationBusService } from '../services/validation-bus.service';
import { ValidationError } from '../models/validation-error.model';

@Directive({
  selector: '[formGroup]',
})
export class AutoFormErrorDirective implements OnInit {
  private formGroupDirective: FormGroupDirective = inject(FormGroupDirective);
  private validationBus: ValidationBusService = inject(ValidationBusService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  private clearAllErrors(): void {
    const form: FormGroup = this.formGroupDirective.form;

    this.recursiveClearErrors(form);
  }

  private recursiveClearErrors(control: AbstractControl): void {
    control.setErrors(null);

    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((key) => {
        this.recursiveClearErrors(control.get(key)!);
      });
    }
  }

  ngOnInit(): void {
    this.validationBus.validationErrors$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((errors) => {
      errors.length
        ? this.applyErrors(errors)
        : this.clearAllErrors();
    });
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
