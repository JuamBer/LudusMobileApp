import { createAction, props } from '@ngrx/store';
import { Complexity } from 'src/models/Complexity.model';
import { Type } from 'src/models/Type.model';

//LOAD GENDERS
export const loadComplexities = createAction(
  '[Complexities] load Complexities',
);
export const loadComplexitiesSuccess = createAction(
  '[Complexities] load Complexities Success',
  props<{ complexities: Complexity[] }>()
);
export const loadComplexitiesFail = createAction(
  '[Complexities] load Complexities Fail',
  props<{ error: any }>()
);

