import { DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormGroup, FormGroupDirective, ValidatorFn } from '@angular/forms';

import { filter, map, take, takeUntil } from 'rxjs';
import {TGroupedErrors, TValidationError, TValidationEvent} from '../models/validation-error.model';
import {ValidationBusService} from '../services/validation-bus.service';

@Directive({
  selector: '[formGroup]',
})
export class AutoFormErrorDirective implements OnInit {
  private formGroupDirective: FormGroupDirective = inject(FormGroupDirective);
  private validationBus: ValidationBusService = inject(ValidationBusService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  private activeValidators: WeakMap<AbstractControl, ValidatorFn> = new WeakMap<
    AbstractControl,
    ValidatorFn
  >();

  ngOnInit(): void {
    this.validationBus.validationErrors$
      .pipe(
        filter((event: TValidationEvent) => {
          if (event.form) {
            return event.form === this.formGroupDirective.form;
          }

          return true;
        }),
        map((event: TValidationEvent) => {
          return {
            errors: event.errors.filter(error => Boolean(error.Path)),
            form: event.form,
          };
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(event => this.applyErrors(event));
  }

  private applyErrors(event: TValidationEvent): void {
    const errors: TValidationError[] = event.errors;
    const form: FormGroup = event.form || this.formGroupDirective.form;

    const groupedErrors: TGroupedErrors = this.createGroupedErrors(errors);

    this.applyServerErrorValidator(form, groupedErrors);
  }

  private createGroupedErrors(errors: TValidationError[]): TGroupedErrors {
    return errors.reduce((acc, err) => {
      const normalizedPath: string = err.Path.replace(/\[\d+]$/, '');

      if (!acc[normalizedPath]) {
        acc[normalizedPath] = {};
      }

      acc[normalizedPath][err.Path] = err.Message;

      return acc;
    }, {} as TGroupedErrors);
  }

  private applyServerErrorValidator(form: FormGroup, groupedErrors: TGroupedErrors): void {
    Object.keys(groupedErrors).forEach(path => {
      const control: AbstractControl = form.get(path);

      if (!control) return;

      if (this.activeValidators.has(control)) {
        control.removeValidators(this.activeValidators.get(control));
      }

      const initialValue: typeof control.value = control.value;

      const serverValidator: ValidatorFn = () => {
        return groupedErrors[path];
      };

      this.activeValidators.set(control, serverValidator);

      control.addValidators(serverValidator);
      control.updateValueAndValidity();

      control.valueChanges
        .pipe(
          filter(val => val !== initialValue),
          take(1),
          takeUntil(this.validationBus.validationErrors$),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe(() => {
          control.removeValidators(serverValidator);
          this.activeValidators.delete(control);
          control.updateValueAndValidity({ emitEvent: false });
        });
    });
  }
}
