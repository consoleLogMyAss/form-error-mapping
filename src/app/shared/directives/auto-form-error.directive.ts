import { Directive, Input, OnInit, inject, DestroyRef } from '@angular/core';
import {AbstractControl, FormGroup, FormGroupDirective} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationBusService } from '../services/validation-bus.service';
import { ValidationError } from '../models/validation-error.model';

@Directive({
  selector: '[formGroup]',
  standalone: true,
  host: {
    '(ngSubmit)': 'onFormSubmit()',
  },
})
export class AutoFormErrorDirective implements OnInit {
  private formGroupDirective: FormGroupDirective = inject(FormGroupDirective);
  private validationBus: ValidationBusService = inject(ValidationBusService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  onFormSubmit(): void {
    this.clearAllErrors();
  }

  private clearAllErrors(): void {
    const form: FormGroup = this.formGroupDirective.form;

    Object.keys(form.controls).forEach(key => {
      const control: AbstractControl = form.get(key);

      if (control) {
        control.setErrors(null);
      }
    });
  }

  ngOnInit(): void {
    this.validationBus.validationErrors$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((errors) => {
        this.applyErrors(errors);
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

    console.log(groupedErrors);

    Object.keys(groupedErrors).forEach((path) => {
      const control: AbstractControl = this.formGroupDirective.form.get(path);

      if (control) {
        control.setErrors({ [path]: groupedErrors[path] });
        control.markAsTouched();
      }
    });
  }
}
