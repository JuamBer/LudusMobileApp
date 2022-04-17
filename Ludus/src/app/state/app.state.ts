import * as auth from './auth/auth.reducer';
import * as games from './games/games.reducer';
import * as reviews from './reviews/reviews.reducer';
import * as genders from './genders/genders.reducer';

export interface AppState {
  auth: auth.State,
  games: games.State,
  reviews: reviews.State,
  genders: genders.State
}
