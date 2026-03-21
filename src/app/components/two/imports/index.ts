import { Type, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {FormService} from '../services/form.service';
import {ApiService} from '../services/api.service';

export const TwoImports: Type<unknown>[] = [ReactiveFormsModule];
export const TwoProviders: Provider[] = [FormService, ApiService];
