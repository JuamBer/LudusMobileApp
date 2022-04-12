import { ActionReducerMap } from '@ngrx/store';
import * as auth from './auth/state/auth.reducer';

export interface AppState {
  user: auth.State
}



export const appReducers: ActionReducerMap<AppState> = {
  user: auth.authReducer
}
