import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OneImports, OneProviders } from './imports';
import { ApiService } from './services/api.service';
import { FormService } from './services/form.service';
import {AbstractControl, FormArray} from '@angular/forms';

@Component({
  selector: 'one',
  imports: OneImports,
  providers: OneProviders,
  templateUrl: './one.component.html',
  styleUrl: './one.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneComponent {
  private apiService: ApiService = inject(ApiService);
  protected formService: FormService = inject(FormService);

  protected get controls(): AbstractControl[] {
    return (this.formService.formArr.get('sounds') as FormArray).controls
  }

  protected onSubmit(): void {
    this.apiService.postTest(
      this.formService.form.value,
      this.formService.form
    )
  }

  protected postDataHandel() {
    this.apiService.postData(
      this.formService.formData.value,
      this.formService.formData
    )
  }

  protected arrDataHandel() {
    this.apiService.postArrData(
      this.formService.formArr.value,
      this.formService.formArr
    )
  }
}
