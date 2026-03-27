import { Directive, OnInit, inject, DestroyRef } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective, ValidatorFn } from '@angular/forms';
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

  private activeValidators = new WeakMap<AbstractControl, ValidatorFn>();

  ngOnInit(): void {
    this.validationBus.validationErrors$.pipe(
      filter((event: ValidationEvent) => {
        if (event.form) {
          return event.form === this.formGroupDirective.form
        }

        return true;
      }),
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
        if (this.activeValidators.has(control)) {
          control.removeValidators(this.activeValidators.get(control)!);
        }

        const initialValue: typeof control.value= control.value;

        const serverValidator: ValidatorFn = (c: AbstractControl) => {
          return { [path]: groupedErrors[path] }
        };

        this.activeValidators.set(control, serverValidator);

        control.addValidators(serverValidator);
        control.updateValueAndValidity();

        control.valueChanges
          .pipe(
            filter((val) => val !== initialValue),
            take(1),
            takeUntil(this.validationBus.validationErrors$),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(() => {
            control.removeValidators(serverValidator);
            this.activeValidators.delete(control);
            control.updateValueAndValidity({ emitEvent: false });
          });
      }
    });
  }
}
