import { createReducer, on } from '@ngrx/store';
import { Filter } from 'src/models/Filter.model';
import { Game } from 'src/models/Game';
import { Message } from 'src/models/Message.model';
import { Page, PageType } from 'src/models/Page.model';
import * as authActions from './games.actions';
import * as messages from 'src/utils/messages';

export interface State {
  game: Game,
  games: Game[],
  card_games: Page<Game>,
  popular_games: Page<Game>,
  quick_games: Page<Game>,
  filter: Filter;
  search_results_games: Page<Game> | null
  special_game1: Game;
  special_game2: Game;
  message: Message
}

export const initialState: State = {
  game: null,
  games: [],
  card_games: {
    items: [],
    primerDoc: null,
    ultimoDoc: null,
    limit: 4,
    type: PageType.CARD_GAMES
  },
  popular_games: {
    items: [],
    primerDoc: null,
    ultimoDoc: null,
    limit: 4,
    type: PageType.POPULAR_GAMES
  },
  quick_games: {
    items: [],
    primerDoc: null,
    ultimoDoc: null,
    limit: 4,
    type: PageType.QUICK_GAMES
  },
  filter: {
    genders: [],
    players: null,
    complexity: null,
    text: null
  },
  search_results_games: null,
  special_game1: undefined,
  special_game2: undefined,
  message: undefined
}

export const gamesReducer = createReducer(initialState,
  on(authActions.updateAverageRatingSuccess, (state, { game }) => ({ ...state, game: game })),

  on(authActions.loadSpecialGame1Success, (state, { game }) => ({ ...state, special_game1: game })),
  on(authActions.loadSpecialGame2Success, (state, { game }) => ({ ...state, special_game2: game })),


  on(authActions.loadGameSuccess, (state, { game }) => ({ ...state, game: game })),
  on(authActions.loadGamesSuccess, (state, { games }) => ({ ...state, games: games})),

  //LOAD CARD GAMES
  on(authActions.loadCardGamesSuccess, (state, { page }) => ({ ...state, card_games: page })),
  on(authActions.loadMoreCardGames, (state, { page }) => ({ ...state, message: messages.loadingMessage})),
  on(authActions.loadMoreCardGamesSuccess, (state, { page }) => (
    {
      ...state,
      card_games: {
        ...page,
        items: [...state.card_games.items, ...page.items]
      },
      message: messages.loadMoreGamesSuccess
  })),
  //LOAD POPULAR GAMES
  on(authActions.loadPopularGamesSuccess, (state, { page }) => ({...state, popular_games: page })),
  on(authActions.loadMorePopularGames, (state, { page }) => ({ ...state, message: messages.loadingMessage })),
  on(authActions.loadMorePopularGamesSuccess, (state, { page }) => (
    {
      ...state,
      popular_games: {
        ...page,
        items: [...state.popular_games.items, ...page.items]
      },
      message: messages.loadMoreGamesSuccess
  })),
  //LOAD QUICK GAMES
  on(authActions.loadQuickGamesSuccess, (state, { page }) => ({ ...state, quick_games: page })),
  on(authActions.loadMoreQuickGames, (state, { page }) => ({ ...state, message: messages.loadingMessage })),
  on(authActions.loadMoreQuickGamesSuccess, (state, { page }) => (
    {
      ...state,
      quick_games: {
        ...page,
        items: [...state.quick_games.items, ...page.items]
      },
      message: messages.loadMoreGamesSuccess
    })),
  //LOAD FILTERED GAMES
  on(authActions.loadFilteredGames, (state, { filter }) => ({ ...state, filter: filter, message: messages.loadingMessage })),
  on(authActions.loadFilteredGamesSuccess, (state, { page }) => {
    if (page!=null){
      return {
        ...state,
        search_results_games: page,
        message: messages.loadMoreGamesSuccess
      }
    }else{
      return {
        ...state,
        search_results_games: null
      }
    }
  }),
  on(authActions.loadMoreFilteredGames, (state, { page }) => ({ ...state, message: messages.loadingMessage })),
  on(authActions.loadMoreFilteredGamesSuccess, (state, { page }) => {
    if (page != null) {
      return {
        ...state,
        search_results_games: page,
        message: messages.loadMoreGamesSuccess
      }
    } else {
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
