import { createAction, props } from '@ngrx/store';
import { LoginDTO } from 'src/models/dtos/LoginDTO.model';
import { RegisterDTO } from 'src/models/dtos/RegisterDTO.model';
import { Game } from 'src/models/Game';
import { User } from 'src/models/User';

//LOGIN
export const loginUser = createAction(
  '[Auth] loginUser',
  props<{ loginDTO: LoginDTO }>()
);
export const loginUserSuccess = createAction(
  '[Auth] loginUserSuccess',
  props<{ user: User }>()
);
export const loginUserFail = createAction(
  '[Auth] loginUserFail',
  props<{ error: any }>()
);

//LOGIN WITH GOOGLE
export const loginUserWithGoogle = createAction(
  '[Auth] loginUserWithGoogle'
);
export const loginUserWithGoogleSuccess = createAction(
  '[Auth] loginUserWithGoogleSuccess',
  props<{ user: User }>()
);
export const loginUserWithGoogleFail = createAction(
  '[Auth] loginUserWithGoogleFail',
  props<{ error: any }>()
);

//REGISTER
export const register = createAction(
  '[Auth] register',
  props<{ registerDTO: RegisterDTO }>()
);
export const registerSuccess = createAction(
  '[Auth] registerSuccess',
  props<{ user: User }>()
);
export const registerFail = createAction(
  '[Auth] registerFail',
  props<{ error: any }>()
);


//LOGOUT
export const logoutUser = createAction(
  '[Auth] logoutUser'
);
export const logoutUserSuccess = createAction(
  '[Auth] logoutUserSuccess'
);
export const logoutUserFail = createAction(
  '[Auth] logoutUserFail',
  props<{ error: any }>()
);


//CHANGE NAME
export const changeName = createAction(
  '[Auth] changeName',
  props<{ name: string }>()
);
export const changeNameSuccess = createAction(
  '[Auth] changeNameSuccess',
  props<{ name: string }>()
);
export const changeNameFail = createAction(
  '[Auth] changeNameFail',
  props<{ error: any }>()
);


//CHANGE EMAIL
export const changeEmail = createAction(
  '[Auth] changeEmail',
  props<{ email: string }>()
);
export const changeEmailSuccess = createAction(
  '[Auth] changeEmailSuccess',
  props<{ email: string }>()
);
export const changeEmailFail = createAction(
  '[Auth] changeEmailFail',
  props<{ error: any }>()
);

//CHANGE PASSWORD
export const changePassword = createAction(
  '[Auth] changePassword',
  props<{ password: string }>()
);
export const changePasswordSuccess = createAction(
  '[Auth] changePasswordSuccess',
  props<{ password: string }>()
);
export const changePasswordFail = createAction(
  '[Auth] changePasswordFail',
  props<{ error: any }>()
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
  '[Auth] removeGameToFavs',
  props<{ id_user: string, game: Game }>()
);
export const removeGameToFavsSuccess = createAction(
  '[Auth] removeGameToFavsSuccess',
  props<{ id: string }>()
);
export const removeGameToFavsFail = createAction(
  '[Auth] removeGameToFavsFail',
  props<{ error: any }>()
);

//LOAD MY USER
export const loadMyUser = createAction(
  '[Games] loadMyUser',
  props<{ id: string }>()
);
export const loadMyUserSuccess = createAction(
  '[Auth] loadMyUserSuccess',
  props<{ user: User }>()
);
export const loadMyUserFail = createAction(
  '[Auth] loadMyUserFail',
  props<{ error: any }>()
);

export const createGame = createAction(
  '[Auth] createGame',
  props<{ id_user:string, game: Game }>()
);
export const createGameSuccess = createAction(
  '[Auth] createGameSuccess',
  props<{ id_user: string, game: Game }>()
);
export const createGameFail = createAction(
  '[Auth] createGameFail',
  props<{ error: any }>()
);

export const deleteGame = createAction(
  '[Auth] deleteGame',
  props<{ id_user: string, game: Game }>()
);
export const deleteGameSuccess = createAction(
  '[Auth] deleteGameSuccess',
  props<{ id_user:string, game: Game }>()
);
export const deleteGameFail = createAction(
  '[Auth] deleteGameFail',
  props<{ error: any }>()
);

export const updateGame = createAction(
  '[Auth] updateGame',
  props<{ id_user: string, game: Game }>()
);
export const updateGameSuccess = createAction(
  '[Auth] updateGameSuccess',
  props<{ id_user: string, game: Game }>()
);
