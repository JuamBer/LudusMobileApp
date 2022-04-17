import { createAction, props } from '@ngrx/store';
import { Game } from 'src/models/Game';
import { User } from 'src/models/User';

//LOGIN
export const loginUser = createAction(
  '[Auth] loginUser',
  props<{ user: User }>()
);
export const loginUserSuccess = createAction(
  '[Auth] loginUserSuccess',
  props<{ user: User }>()
);
export const loginUserFail = createAction(
  '[Auth] loginUserFail',
  props<{ user: User }>()
);

//LOGOUT
export const logoutUser = createAction(
  '[Auth] logoutUser'
);
export const logoutUserSuccess = createAction(
  '[Auth] logoutUserSuccess'
);
export const logoutUserFail = createAction(
  '[Auth] logoutUserFail'
);


//CHANGE NAME
export const changeName = createAction(
  '[Auth] changeName',
  props<{ name: string }>()
);

//CHANGE EMAIL
export const changeEmail = createAction(
  '[Auth] changeEmail',
  props<{ email: string }>()
);

//ADD GAME TO FAVS
export const addGameToFavs = createAction(
  '[Games] addGameToFavs',
  props<{ id_user: string, game: Game }>()
);
export const addGameToFavsSuccess = createAction(
  '[Games] addGameToFavsSuccess',
  props<{ id: string }>()
);
export const addGameToFavsFail = createAction(
  '[Games] addGameToFavsFail',
  props<{ error: any }>()
);

//REMOVE GAME TO FAVS
export const removeGameToFavs = createAction(
  '[Games] removeGameToFavs',
  props<{ id_user: string, game: Game }>()
);
export const removeGameToFavsSuccess = createAction(
  '[Games] removeGameToFavsSuccess',
  props<{ id: string }>()
);
export const removeGameToFavsFail = createAction(
  '[Games] removeGameToFavsFail',
  props<{ error: any }>()
);


//LOAD FAVS GAMES
export const loadFavsGames = createAction(
  '[Games] loadFavsGames',
  props<{ id: string }>()
);
export const loadFavsGamesSuccess = createAction(
  '[Games] loadFavsGamesSuccess',
  props<{ ids_favs_games: string[] }>()
);
export const loadFavsGamesFail = createAction(
  '[Games] loadFavsGamesFail',
  props<{ error: any }>()
);

