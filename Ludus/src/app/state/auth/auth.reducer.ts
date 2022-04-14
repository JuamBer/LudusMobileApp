import { createReducer, on } from '@ngrx/store';
import { User } from 'src/models/User';
import * as authActions from './auth.actions';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null,
}

export const authReducer = createReducer(initialState,

  on(authActions.loginUserSuccess, (state, { user }) => ({ ...state, user: user})),
  on(authActions.logoutUserSuccess, (state) => ({ ...state, user: null })),

);
