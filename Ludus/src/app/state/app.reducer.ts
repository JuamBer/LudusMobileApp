import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import * as auth from './auth/auth.reducer';
import * as games from './games/games.reducer';
import * as reviews from './reviews/reviews.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  auth: auth.authReducer,
  games: games.gamesReducer,
  reviews: reviews.reviewsReducer
}
