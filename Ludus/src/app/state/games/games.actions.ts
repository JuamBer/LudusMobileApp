import { createAction, props } from '@ngrx/store';
import { ScrollFilter } from 'src/models/ScrollFilter.model';
import { Game } from 'src/models/Game';
import { User } from 'src/models/User';
import { Filter } from 'src/models/Filter.model';

//UPDATE AVERAGE RATING
export const updateAverageRatingSuccess = createAction(
  '[Games] updateAverageRatingSuccess',
  props<{ game: Game }>()
);
export const updateAverageRatingFail = createAction(
  '[Games] updateAverageRatingFail',
  props<{ error: any }>()
);


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

//LOAD SPECIAL GAME 1
export const loadSpecialGame1 = createAction(
  '[Games] loadSpecialGame1',
  props<{ id: string }>()
);
export const loadSpecialGame1Success = createAction(
  '[Games] loadSpecialGame1 Success',
  props<{ game: Game }>()
);
export const loadSpecialGame1Fail = createAction(
  '[Games] loadSpecialGame1 Fail',
  props<{ error: any }>()
);

//LOAD SPECIAL GAME 2
export const loadSpecialGame2 = createAction(
  '[Games] loadSpecialGame2',
  props<{ id: string }>()
);
export const loadSpecialGame2Success = createAction(
  '[Games] loadSpecialGame2 Success',
  props<{ game: Game }>()
);
export const loadSpecialGame2Fail = createAction(
  '[Games] loadSpecialGame2 Fail',
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
  props < { scrollFilter: ScrollFilter }>()
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

//LOAD FILTERED GAMES
export const loadFilteredGames = createAction(
  '[Games] loadFilteredGames',
  props<{ filter: Filter }>()
);
export const loadFilteredGamesSuccess = createAction(
  '[Games] loadFilteredGamesSuccess',
  props<{ games: Game[] }>()
);
export const loadFilteredGamesFail = createAction(
  '[Games] loadFilteredGamesFail',
  props<{ error: any }>()
);
export const unSetFilteredGames = createAction(
  '[Games] unSetFilteredGames'
);
export const unSetFilteredResultsGames = createAction(
  '[Games] unSetFilteredResultsGames'
);
