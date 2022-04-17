import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import * as auth from './auth/auth.reducer';
import * as games from './games/games.reducer';
import * as reviews from './reviews/reviews.reducer';
import * as genders from './genders/genders.reducer';
import * as types from './types/types.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  auth: auth.authReducer,
  games: games.gamesReducer,
  reviews: reviews.reviewsReducer,
  genders: genders.gendersReducer,
  types: types.typesReducer
}
