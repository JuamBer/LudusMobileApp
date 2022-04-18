import { createReducer, on } from '@ngrx/store';
import { Complexity } from 'src/models/Complexity.model';
import * as complexitiesActions from './complexities.actions';

export interface State {
  complexities: Complexity[]
}

export const initialState: State = {
  complexities: []
}

export const complexitiesReducer = createReducer(initialState,

  on(complexitiesActions.loadComplexitiesSuccess, (state, { complexities }) => ({ ...state, complexities: complexities })),

);
