import { createAction, props } from '@ngrx/store';
import { Gender } from 'src/models/Gender';

//LOAD GENDERS
export const loadGenders = createAction(
  '[Reviews] load Genders',
);
export const loadGendersSuccess = createAction(
  '[Reviews] load Genders Success',
  props<{ genders: Gender[] }>()
);
export const loadGendersFail = createAction(
  '[Reviews] load Genders Fail',
  props<{ error: any }>()
);

