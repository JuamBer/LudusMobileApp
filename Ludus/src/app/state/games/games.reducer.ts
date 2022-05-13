import { createReducer, on } from '@ngrx/store';
import { Filter } from 'src/models/Filter.model';
import { Game } from 'src/models/Game';
import { Message } from 'src/models/Message.model';
import { Page, PageType } from 'src/models/Page.model';
import * as gamesActions from './games.actions';
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
  on(gamesActions.updateAverageRatingSuccess, (state, { game }) => ({ ...state, game: game })),

  on(gamesActions.loadSpecialGame1Success, (state, { game }) => ({ ...state, special_game1: game })),
  on(gamesActions.loadSpecialGame2Success, (state, { game }) => ({ ...state, special_game2: game })),


  on(gamesActions.loadGameSuccess, (state, { game }) => ({ ...state, game: game })),
  on(gamesActions.loadGamesSuccess, (state, { games }) => ({ ...state, games: games })),

  //LOAD CARD GAMES
  on(gamesActions.loadCardGamesSuccess, (state, { page }) => ({ ...state, card_games: page })),
  on(gamesActions.loadMoreCardGames, (state, { page }) => ({ ...state, message: messages.loadingMessage })),
  on(gamesActions.loadMoreCardGamesSuccess, (state, { page }) => (
    {
      ...state,
      card_games: {
        ...page,
        items: [...state.card_games.items, ...page.items]
      },
      message: messages.loadMoreGamesSuccess
    })),
  //LOAD POPULAR GAMES
  on(gamesActions.loadPopularGamesSuccess, (state, { page }) => ({ ...state, popular_games: page })),
  on(gamesActions.loadMorePopularGames, (state, { page }) => ({ ...state, message: messages.loadingMessage })),
  on(gamesActions.loadMorePopularGamesSuccess, (state, { page }) => (
    {
      ...state,
      popular_games: {
        ...page,
        items: [...state.popular_games.items, ...page.items]
      },
      message: messages.loadMoreGamesSuccess
    })),
  //LOAD QUICK GAMES
  on(gamesActions.loadQuickGamesSuccess, (state, { page }) => ({ ...state, quick_games: page })),
  on(gamesActions.loadMoreQuickGames, (state, { page }) => ({ ...state, message: messages.loadingMessage })),
  on(gamesActions.loadMoreQuickGamesSuccess, (state, { page }) => (
    {
      ...state,
      quick_games: {
        ...page,
        items: [...state.quick_games.items, ...page.items]
      },
      message: messages.loadMoreGamesSuccess
    })),
  //LOAD FILTERED GAMES
  on(gamesActions.loadFilteredGames, (state, { filter }) => ({ ...state, filter: filter, message: messages.loadingMessage })),
  on(gamesActions.loadFilteredGamesSuccess, (state, { page }) => {
    if (page != null) {
      return {
        ...state,
        search_results_games: page,
        message: messages.loadGamesSuccess
      }
    } else {
      return {
        ...state,
        search_results_games: {
          items: [],
          primerDoc: null,
          ultimoDoc: null,
          limit: 3,
          type: PageType.FILTERED_GAMES
        }
      }
    }
  }),
  on(gamesActions.loadFilteredGamesFail, (state, { error }) => (
    {
      ...state,
      message: messages.errorMessage
    })),
  on(gamesActions.loadMoreFilteredGames, (state, { page }) => ({ ...state, message: messages.loadingMessage })),
  on(gamesActions.loadMoreFilteredGamesSuccess, (state, { page }) => {
    if (page != null) {
      return {
        ...state,
        search_results_games: page,
        message: messages.loadMoreGamesSuccess
      }
    } else {
      return {
        ...state,
        search_results_games: {
          items: [],
          primerDoc: null,
          ultimoDoc: null,
          limit: null,
          type: null
        }
      }
    }
  }),
  on(gamesActions.loadMoreCardGamesFail, (state, { error }) => (
    {
      ...state,
      message: messages.errorMessage
    })),

  on(gamesActions.unSetFilteredGames, (state) => ({
    ...state,
    filter: {
      genders: [],
      players: null,
      complexity: null,
      text: null
    },
    search_results_games: null,
  })),
  on(gamesActions.unSetFilteredResultsGames, (state) => ({
    ...state,
    search_results_games: null,
  })),

  //update
  on(gamesActions.updateGame, (state, { game }) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(gamesActions.updateGameSuccess, (state, { game }) => {
    return {
      ...state,
      message: { ...messages.updateGameSuccess }
    }
  }),
  on(gamesActions.createGameFail, (state, { error }) => ({
    ...state,
    message: messages.errorMessage
  })),
  //delete
  on(gamesActions.deleteGame, (state, { game }) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(gamesActions.deleteGameSuccess, (state, { game }) => {
    return {
      ...state,
      message: { ...messages.deleteGameSuccess }
    }
  }),
  on(gamesActions.deleteGameFail, (state, { error }) => ({
    ...state,
    message: messages.errorMessage
  })),
);
