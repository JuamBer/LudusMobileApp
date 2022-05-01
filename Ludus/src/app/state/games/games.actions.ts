import { createAction, props } from '@ngrx/store';
import { ScrollFilter } from 'src/models/ScrollFilter.model';
import { Game } from 'src/models/Game';
import { User } from 'src/models/User';
import { Filter } from 'src/models/Filter.model';
import { Page } from 'src/models/Page.model';

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
  props<{ page: Page<Game> }>()
);
export const loadCardGamesSuccess = createAction(
  '[Games] loadCardGamesSuccess',
  props<{ page: Page<Game> }>()
);
export const loadCardGamesFail = createAction(
  '[Games] loadCardGamesFail',
  props<{ error: any }>()
);
export const loadMoreCardGames = createAction(
  '[Games] loadMoreCardGames',
  props<{ page: Page<Game> }>()
);
export const loadMoreCardGamesSuccess = createAction(
  '[Games] loadMoreCardGamesSuccess',
  props<{ page: Page<Game> }>()
);
export const loadMoreCardGamesFail = createAction(
  '[Games] loadMoreCardGamesFail',
  props<{ error: any }>()
);
//LOAD POPULARS GAMES
export const loadPopularGames = createAction(
  '[Games] loadPopularGames',
  props<{ page: Page<Game> }>()
);
export const loadPopularGamesSuccess = createAction(
  '[Games] loadPopularGamesSuccess',
  props<{ page: Page<Game> }>()
);
export const loadPopularGamesFail = createAction(
  '[Games] loadPopularGamesFail',
  props<{ error: any }>()
);
export const loadMorePopularGames = createAction(
  '[Games] loadMorePopularGames',
  props<{ page: Page<Game> }>()
);
export const loadMorePopularGamesSuccess = createAction(
  '[Games] loadMorePopularGamesSuccess',
  props<{ page: Page<Game> }>()
);
export const loadMorePopularGamesFail = createAction(
  '[Games] loadMorePopularGamesFail',
  props<{ error: any }>()
);

//LOAD QUICK GAMES
export const loadQuickGames = createAction(
  '[Games] loadQuickGames',
  props<{ page: Page<Game> }>()
);
export const loadQuickGamesSuccess = createAction(
  '[Games] loadQuickGamesSuccess',
  props<{ page: Page<Game> }>()
);
export const loadQuickGamesFail = createAction(
  '[Games] loadQuickGamesFail',
  props<{ error: any }>()
);
export const loadMoreQuickGames = createAction(
  '[Games] loadMoreQuickGames',
  props<{ page: Page<Game> }>()
);
export const loadMoreQuickGamesSuccess = createAction(
  '[Games] loadMoreQuickGamesSuccess',
  props<{ page: Page<Game> }>()
);
export const loadMoreQuickGamesFail = createAction(
  '[Games] loadMoreQuickGamesFail',
  props<{ error: any }>()
);
//LOAD FILTERED GAMES
export const loadFilteredGames = createAction(
  '[Games] loadFilteredGames',
  props<{ page: Page<Game>, filter: Filter }>()
);
export const loadFilteredGamesSuccess = createAction(
  '[Games] loadFilteredGamesSuccess',
  props<{ page: Page<Game> }>()
);
export const loadFilteredGamesFail = createAction(
  '[Games] loadFilteredGamesFail',
  props<{ error: any }>()
);
export const loadMoreFilteredGames = createAction(
  '[Games] loadMoreFilteredGames',
  props<{ page: Page<Game>, filter: Filter }>()
);
export const loadMoreFilteredGamesSuccess = createAction(
  '[Games] loadMoreFilteredGamesSuccess',
  props<{ page: Page<Game> }>()
);
export const loadMoreFilteredGamesFail = createAction(
  '[Games] loadMoreFilteredGamesFail',
  props<{ error: any }>()
);
export const unSetFilteredGames = createAction(
  '[Games] unSetFilteredGames'
);
export const unSetFilteredResultsGames = createAction(
  '[Games] unSetFilteredResultsGames'
);
