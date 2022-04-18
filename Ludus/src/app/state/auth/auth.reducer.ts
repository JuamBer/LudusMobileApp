import { createReducer, on } from '@ngrx/store';
import { Game } from 'src/models/Game';
import { User } from 'src/models/User';
import * as authActions from './auth.actions';

export interface State {
  user: User | null;
  ids_favs_games: string[];
  loading: boolean;
  success: boolean;
  error: any;
}

export const initialState: State = {
  user: null,
  ids_favs_games: [],
  loading: false,
  success: false,
  error: null
}

export const authReducer = createReducer(initialState,

  on(authActions.loginUser, (state, { user }) => ({ ...state, user: user, success: true})),
  on(authActions.logoutUser, (state) => ({ ...state, user: null, success: true })),
  on(authActions.changeName, (state, { name }) => ({ ...state, user: { ...state.user, name: name }, success: true})),
  on(authActions.changeEmail, (state, { email }) => ({ ...state, user: { ...state.user, email: email }, success: true })),

  on(authActions.addGameToFavsSuccess, (state, { id }) => ({ ...state, ids_favs_games: [...state.ids_favs_games, id] })),
  on(authActions.loadFavsGamesSuccess, (state, { ids_favs_games }) => ({ ...state, ids_favs_games: ids_favs_games })),
  on(authActions.removeGameToFavsSuccess, (state, { id }) => ({
    ...state,
    ids_favs_games: state.ids_favs_games.filter(id_game => id_game != id)
   })),
);
