import { Type, Provider } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormService } from '../services/form.service';
import { CoreFormsImports } from '../../../shared/shared-imports';
import {KeyValuePipe} from '@angular/common';

export const OneImports: Type<unknown>[] = [...CoreFormsImports, KeyValuePipe];
export const OneProviders: Provider[] = [ApiService, FormService];

