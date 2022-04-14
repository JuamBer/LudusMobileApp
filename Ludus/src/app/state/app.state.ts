import * as auth from './auth/auth.reducer';
import * as games from './games/games.reducer';

export interface AppState {
  user: auth.State,
  games: games.State
}
