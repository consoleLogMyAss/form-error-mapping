import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThreeImports, ThreeProviders } from './imports';
import { ApiService } from './services/api.service';
import { FormService } from './services/form.service';

@Component({
  selector: 'three',
  imports: ThreeImports,
  providers: ThreeProviders,
  templateUrl: './three.component.html',
  styleUrl: './three.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreeComponent {
  private apiService: ApiService = inject(ApiService);
  protected formService: FormService = inject(FormService);

  protected onSubmit(): void {
    this.apiService.postTest(this.formService.form.value)
  }
}
