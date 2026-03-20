import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TwoImports, TwoProviders } from './imports';

@Component({
  selector: 'two',
  imports: [TwoImports],
  providers: [TwoProviders],
  standalone: true,
  templateUrl: './two.component.html',
  styleUrl: './two.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoComponent {}
