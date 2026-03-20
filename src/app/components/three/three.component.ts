import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThreeImports, ThreeProviders } from './imports';

@Component({
  selector: 'three',
  imports: [ThreeImports],
  providers: [ThreeProviders],
  standalone: true,
  templateUrl: './three.component.html',
  styleUrl: './three.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreeComponent {}
