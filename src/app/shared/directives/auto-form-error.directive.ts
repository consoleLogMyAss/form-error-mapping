import { Directive, HostListener, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ValidationBusService } from '../services/validation-bus.service';
import { ValidationError } from '../models/validation-error.model';

@Directive({
  selector: '[formGroup]',
})
export class AutoFormErrorDirective implements OnInit, OnDestroy {
  private formGroupDirective: FormGroupDirective = inject(FormGroupDirective);
  private validationBus: ValidationBusService = inject(ValidationBusService);
  private destroy$: Subject<void> = new Subject<void>();

  // Track if this form was recently submitted to prevent errors leaking to other forms on the same page
  private isLastToSubmit = false;

  @HostListener('ngSubmit')
  onFormSubmit(): void {
    this.isLastToSubmit = true;
    this.clearAllErrors();
  }

  private clearAllErrors(): void {
    const form = this.formGroupDirective.form;

    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);

      if (control) {
        control.setErrors(null);
      }
    });
  }


  ngOnInit(): void {
    this.validationBus.validationErrors$
      .pipe(takeUntil(this.destroy$))
      .subscribe((errors) => {
        this.applyErrors(errors);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyErrors(errors: ValidationError[]): void {
    // Group errors by path
    const groupedErrors = errors.reduce((acc, err) => {
      if (!acc[err.Path]) {
        acc[err.Path] = [];
      }
      acc[err.Path].push(err.Message);
      return acc;
    }, {} as Record<string, string[]>);

    Object.keys(groupedErrors).forEach((path) => {
      const control = this.formGroupDirective.form.get(path);
      if (control) {
        // According to user request: control.setError({ [Path]: Message[] })
        control.setErrors({ [path]: groupedErrors[path] });
        control.markAsTouched();
      }
    });

    // Reset submit flag after errors are handled
    this.isLastToSubmit = false;
  }
}
