import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OneImports, OneProviders } from './imports';
import { ApiService } from './services/api.service';
import { FormService } from './services/form.service';
import {KeyValuePipe} from '@angular/common';

@Component({
  selector: 'one',
  imports: [
    OneImports,
    KeyValuePipe
  ],
  providers: OneProviders,
  templateUrl: './one.component.html',
  styleUrl: './one.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneComponent {
  private apiService: ApiService = inject(ApiService);
  protected formService: FormService = inject(FormService);

  protected onSubmit(): void {
    this.apiService.postTest(this.formService.form.value, this.formService.form)
  }

  protected postDataHandel() {
    console.log(this.formService.formData);
  /*  if (this.formService.formData.invalid) {
      this.formService.formData.markAllAsTouched();
      this.formService.formData.markAllAsDirty();

      this.formService.formData.get('title').updateValueAndValidity()
      this.formService.formData.get('lastName').updateValueAndValidity()
      this.formService.formData.get('age').updateValueAndValidity()
      return;
    }*/


    this.apiService.postData(this.formService.formData.value, this.formService.formData)
  }
}
