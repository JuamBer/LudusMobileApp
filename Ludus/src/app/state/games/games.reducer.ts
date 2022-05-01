import { createReducer, on } from '@ngrx/store';
import { Filter } from 'src/models/Filter.model';
import { Game } from 'src/models/Game';
import { Page } from 'src/models/Page.model';
import * as authActions from './games.actions';

export interface State {
  game: Game,
  games: Game[],
  card_games: Game[],
  popular_games: Page<Game>,
  quick_games: Game[],
  filter: Filter;
  search_results_games: Game[] | null
  special_game1: Game;
  special_game2: Game;
}

export const initialState: State = {
  game: null,
  games: [],
  card_games: [],
  popular_games: {
    items: [],
    primerDoc: null,
    ultimoDoc: null,
    limit: 4,
  },
  quick_games: [],
  filter: {
    genders: [],
    players: null,
    complexity: null,
    text: null
  },
  search_results_games: null,
  special_game1: undefined,
  special_game2: undefined
}

export const gamesReducer = createReducer(initialState,
  on(authActions.updateAverageRatingSuccess, (state, { game }) => ({ ...state, game: game })),
  on(authActions.loadSpecialGame1Success, (state, { game }) => ({ ...state, special_game1: game })),
  on(authActions.loadSpecialGame2Success, (state, { game }) => ({ ...state, special_game2: game })),
  on(authActions.loadGameSuccess, (state, { game }) => ({ ...state, game: game })),
  on(authActions.loadGameSuccess, (state, { game }) => ({ ...state, game: game })),
  on(authActions.loadGamesSuccess, (state, { games }) => ({ ...state, games: games})),
  on(authActions.loadCardGamesSuccess, (state, { games }) => ({ ...state, card_games: games })),

  on(authActions.loadPopularGamesSuccess, (state, { page }) => (
    {
      ...state,
      popular_games: page
    }
  )),
  on(authActions.loadMorePopularGamesSuccess, (state, { page }) => (
    {
      ...state,
      popular_games: {
        ...page,
        items: [...state.popular_games.items, ...page.items]
    }
  })),

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
