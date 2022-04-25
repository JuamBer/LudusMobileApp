import { createReducer, on } from '@ngrx/store';
import { Filter } from 'src/models/Filter.model';
import { Game } from 'src/models/Game';
import * as authActions from './games.actions';

export interface State {
  game: Game,
  games: Game[],
  card_games: Game[],
  popular_games: Game[],
  quick_games: Game[],
  filter: Filter;
  search_results_games: Game[] | null
}

export const initialState: State = {
  game: null,
  games: [],
  card_games: [],
  popular_games: [],
  quick_games: [],
  filter: {
    genders: [],
    players: null,
    complexity: null,
    text: null
  },
  search_results_games: null,
}

export const gamesReducer = createReducer(initialState,
  on(authActions.updateAverageRatingSuccess, (state, { game }) => ({ ...state, game: game })),

  on(authActions.loadGameSuccess, (state, { game }) => ({ ...state, game: game })),
  on(authActions.loadGameSuccess, (state, { game }) => ({ ...state, game: game })),
  on(authActions.loadGamesSuccess, (state, { games }) => ({ ...state, games: games})),
  on(authActions.loadCardGamesSuccess, (state, { games }) => ({ ...state, card_games: games })),
  on(authActions.loadPopularGamesSuccess, (state, { games }) => ({ ...state, popular_games: games })),
  on(authActions.loadQuickGamesSuccess, (state, { games }) => ({ ...state, quick_games: games })),
  on(authActions.loadFilteredGames, (state, { filter }) => ({ ...state, filter: filter })),
  on(authActions.loadFilteredGamesSuccess, (state, { games }) => {
    if(games!=null){
      return {
        ...state,
        search_results_games: games
      }
    }else{
      return {
        ...state,
        search_results_games: null
      }
    }
  }),
  on(authActions.unSetFilteredGames, (state) => ({
    ...state,
    filter: {
      genders: [],
      players: null,
      complexity: null,
      text: null
    },
    search_results_games: null,
  })),
  on(authActions.unSetFilteredResultsGames, (state) => ({
    ...state,
    search_results_games: null,
  })),
);
