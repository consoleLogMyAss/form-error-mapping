import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TwoImports, TwoProviders } from './imports';
import { ApiService } from './services/api.service';
import { FormService } from './services/form.service';

@Component({
  selector: 'two',
  imports: TwoImports,
  providers: TwoProviders,
  templateUrl: './two.component.html',
  styleUrl: './two.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoComponent {
  private apiService: ApiService = inject(ApiService);
  protected formService: FormService = inject(FormService);

  protected onSubmit(): void {
    this.apiService.postTest(this.formService.form.value)
  }
}
