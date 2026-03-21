import { Type, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {ApiService} from '../services/api.service';
import {FormService} from '../services/form.service';

export const OneImports: Type<unknown>[] = [ReactiveFormsModule];
export const OneProviders: Provider[] = [ApiService, FormService];
