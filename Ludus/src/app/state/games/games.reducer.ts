import { createReducer, on } from '@ngrx/store';
import { Game } from 'src/models/Game';
import * as authActions from './games.actions';

export interface State {
  games: Game[],
  card_games: Game[],
  popular_games: Game[],
  quick_games: Game[],
  search_results_games: Game[] | null
}

export const initialState: State = {
  games: [],
  card_games: [],
  popular_games: [],
  quick_games: [],
  search_results_games: null
}

export const gamesReducer = createReducer(initialState,

  on(authActions.loadGamesSuccess, (state, { games }) => ({ ...state, games: games})),
  on(authActions.loadCardGamesSuccess, (state, { games }) => ({ ...state, card_games: games })),
  on(authActions.loadPopularGamesSuccess, (state, { games }) => ({ ...state, popular_games: games })),
  on(authActions.loadQuickGamesSuccess, (state, { games }) => ({ ...state, quick_games: games })),
  on(authActions.loadSearchResultsGamesSuccess, (state, { games }) => ({ ...state, search_results_games: games })),
  on(authActions.unSetSearchResultsGames, (state) => ({ ...state, search_results_games: null })),

);
