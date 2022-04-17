import { createReducer, on } from '@ngrx/store';
import { Gender } from 'src/models/Gender';
import * as gendersActions from './genders.actions';

export interface State {
  genders: Gender[]
}

export const initialState: State = {
  genders: []
}

export const gendersReducer = createReducer(initialState,

  on(gendersActions.loadGendersSuccess, (state, { genders }) => ({ ...state, genders: genders })),

);
