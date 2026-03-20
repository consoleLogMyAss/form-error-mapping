import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OneImports, OneProviders } from './imports';

@Component({
  selector: 'one',
  imports: OneImports,
  providers: OneProviders,
  standalone: true,
  templateUrl: './one.component.html',
  styleUrl: './one.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneComponent {}
