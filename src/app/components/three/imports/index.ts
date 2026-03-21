import { Type, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {FormService} from '../services/form.service';
import {ApiService} from '../services/api.service';

export const ThreeImports: Type<unknown>[] = [ReactiveFormsModule];
export const ThreeProviders: Provider[] = [ApiService,FormService];
