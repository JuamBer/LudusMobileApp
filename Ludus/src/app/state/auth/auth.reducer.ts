import { createReducer, on } from '@ngrx/store';
import { User } from 'src/models/User';
import * as authActions from './auth.actions';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
}

export const authReducer = createReducer(initialState,

  on(authActions.loginUser, (state, { user }) => ({ ...state, user: user})),
  on(authActions.logoutUser, (state) => ({ ...state, user: null })),

);
