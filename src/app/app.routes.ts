import { Routes } from '@angular/router';
import { OneComponent } from './components/one/one.component';
import { TwoComponent } from './components/two/two.component';
import { ThreeComponent } from './components/three/three.component';

export const routes: Routes = [
  { path: '', redirectTo: '/one', pathMatch: 'full' },
  { path: 'one', component: OneComponent },
  { path: 'two', component: TwoComponent },
  { path: 'three', component: ThreeComponent },
];
