import * as auth from './auth/auth.reducer';
import * as games from './games/games.reducer';
import * as reviews from './reviews/reviews.reducer';
import * as genders from './genders/genders.reducer';
import * as types from './types/types.reducer';
import * as complexities from './complexities/complexities.reducer';

export interface AppState {
  auth: auth.State,
  games: games.State,
  reviews: reviews.State,
  genders: genders.State,
  types: types.State,
  complexities: complexities.State
}
