import { createReducer, on } from '@ngrx/store';
import { Type } from 'src/models/Type.model';
import * as typesActions from './types.actions';

export interface State {
  types: Type[]
}

export const initialState: State = {
  types: []
}

export const typesReducer = createReducer(initialState,

  on(typesActions.loadTypesSuccess, (state, { types }) => ({ ...state, types: types })),

);
