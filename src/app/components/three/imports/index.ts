import { Type, Provider } from '@angular/core';
import { FormService } from '../services/form.service';
import { ApiService } from '../services/api.service';
import { CoreFormsImports } from '../../../shared/shared-imports';

export const ThreeImports: Type<unknown>[] = [...CoreFormsImports];
export const ThreeProviders: Provider[] = [ApiService, FormService];

