import * as auth from './auth/auth.reducer';
import * as games from './games/games.reducer';

export interface AppState {
  auth: auth.State,
  games: games.State
}
