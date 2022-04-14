import { createAction, props } from '@ngrx/store';
import { User } from 'src/models/User';

//LOGIN
export const loginUser = createAction(
  '[Auth] loginUser',
  props<{ user: User }>()
);
export const loginUserSuccess = createAction(
  '[Auth] loginUserSuccess',
  props<{ user: User }>()
);
export const loginUserFail = createAction(
  '[Auth] loginUserFail',
  props<{ user: User }>()
);

//LOGOUT
export const logoutUser = createAction(
  '[Auth] logoutUser'
);
export const logoutUserSuccess = createAction(
  '[Auth] logoutUserSuccess'
);
export const logoutUserFail = createAction(
  '[Auth] logoutUserFail'
);
