import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OneImports, OneProviders } from './imports';
import { ApiService } from './services/api.service';
import { FormService } from './services/form.service';

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

  protected onSubmit(): void {
    this.apiService.postTest(this.formService.form.value)
  }

  protected postDataHandel() {
    this.apiService.postData(this.formService.formData.value)
  }
}
