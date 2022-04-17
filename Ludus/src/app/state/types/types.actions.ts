import { createAction, props } from '@ngrx/store';
import { Gender } from 'src/models/Gender';
import { Type } from 'src/models/Type.model';

//LOAD GENDERS
export const loadTypes = createAction(
  '[Types] load Types',
);
export const loadTypesSuccess = createAction(
  '[Types] load Genders Success',
  props<{ types: Type[] }>()
);
export const loadTypesFail = createAction(
  '[Types] load Types Fail',
  props<{ error: any }>()
);

