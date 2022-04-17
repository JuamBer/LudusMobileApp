import { createAction, props } from '@ngrx/store';
import { Game } from 'src/models/Game';
import { User } from 'src/models/User';

//LOAD GAME
export const loadGame = createAction(
  '[Games] load Game',
  props<{ id: string }>()
);
export const loadGameSuccess = createAction(
  '[Games] load Game Success',
  props<{ game: Game }>()
);
export const loadGameFail = createAction(
  '[Games] load Game Fail',
  props<{ error: any }>()
);

//LOAD GAMES
export const loadGames = createAction(
  '[Games] loadGames',
);
export const loadGamesSuccess = createAction(
  '[Games] loadGamesSuccess',
  props<{ games: Game[] }>()
);
export const loadGamesFail = createAction(
  '[Games] loadGamesFail',
  props<{ error: any }>()
);

//LOAD CARDS GAMES
export const loadCardGames = createAction(
  '[Games] loadCardGames',
);
export const loadCardGamesSuccess = createAction(
  '[Games] loadCardGamesSuccess',
  props<{ games: Game[] }>()
);
export const loadCardGamesFail = createAction(
  '[Games] loadCardGamesFail',
  props<{ error: any }>()
);

//LOAD POPULARS GAMES
export const loadPopularGames = createAction(
  '[Games] loadPopularGames',
);
export const loadPopularGamesSuccess = createAction(
  '[Games] loadPopularGamesSuccess',
  props<{ games: Game[] }>()
);
export const loadPopularGamesFail = createAction(
  '[Games] loadPopularGamesFail',
  props<{ error: any }>()
);

//LOAD QUICK GAMES
export const loadQuickGames = createAction(
  '[Games] loadQuickGames',
);
export const loadQuickGamesSuccess = createAction(
  '[Games] loadQuickGamesSuccess',
  props<{ games: Game[] }>()
);
export const loadQuickGamesFail = createAction(
  '[Games] loadQuickGamesFail',
  props<{ error: any }>()
);

//LOAD SEARCH RESULT GAMES
export const loadSearchResultsGames = createAction(
  '[Games] loadSearchResultsGames',
  props<{ search: string }>()
);
export const loadSearchResultsGamesSuccess = createAction(
  '[Games] loadSearchResultsGamesSuccess',
  props<{ games: Game[] }>()
);
export const loadSearchResultsGamesFail = createAction(
  '[Games] loadSearchResultsGamesFail',
  props<{ error: any }>()
);
export const unSetSearchResultsGames = createAction(
  '[Games] unSetSearchResultsGames',
);

