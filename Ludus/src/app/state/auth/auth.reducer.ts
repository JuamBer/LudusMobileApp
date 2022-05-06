import { createReducer, on } from '@ngrx/store';
import { Game } from 'src/models/Game';
import { Message } from 'src/models/Message.model';
import { User } from 'src/models/User';
import * as authActions from './auth.actions';
import * as messages from 'src/utils/messages';

export interface State {
  user: User | null;
  ids_favs_games: string[];
  message: Message | null;
}

export const initialState: State = {
  user: null,
  ids_favs_games: [],
  message: null
}

export const authReducer = createReducer(initialState,

  //LOGIN
  on(authActions.loginUser, (state) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(authActions.loginUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    message: messages.loginUserSuccess
  })),
  on(authActions.loginUserFail, (state, { error }) => ({
    ...state,
    message: messages.loginUserFail
  })),

  //LOGIN WITH GOOGLE
  on(authActions.loginUserWithGoogle, (state) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(authActions.loginUserWithGoogleSuccess, (state, { user }) => ({
    ...state,
    user: user,
    message: messages.loginUserSuccess
  })),
  on(authActions.loginUserWithGoogleFail, (state, { error }) => ({
    ...state,
    message: messages.errorMessage
  })),

  //REGISTER
  on(authActions.register, (state) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(authActions.registerSuccess, (state, { user }) => ({
    ...state,
    user: user,
    message: messages.registerSuccess
  })),
  on(authActions.registerFail, (state, { error }) => ({
    ...state,
    message: messages.errorMessage
  })),

  //LOGOUT
  on(authActions.logoutUser, (state) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(authActions.logoutUserSuccess, (state) => ({
    ...state,
    user: null,
    message: messages.logoutUserSuccess
  })),
  on(authActions.logoutUserFail, (state) => ({
    ...state,
    message: messages.errorMessage
  })),


  //CHANGE NAME
  on(authActions.changeName, (state) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(authActions.changeNameSuccess, (state, { name }) => ({
    ...state,
    user: {
      ...state.user,
      name: name
    },
    message: messages.changeNameSuccess
  })),
  on(authActions.changeNameFail, (state, { error }) => {
    return {
      ...state,
      message: messages.errorMessage
    }
  }),

  //CHANGE EMAIL
  on(authActions.changeEmail, (state) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(authActions.changeEmailSuccess, (state, { email }) => ({
    ...state,
    user: {
      ...state.user,
      email: email
    },
    message: messages.changeEmailSuccess
  })),
  on(authActions.changeEmailFail, (state, { error }) => ({
    ...state,
    message: messages.errorMessage
  })),

  //CHANGE PASSWORD
  on(authActions.changePassword, (state) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(authActions.changePasswordSuccess, (state, { password }) => ({
    ...state,
    message: messages.changePasswordSuccess
  })),
  on(authActions.changePasswordFail, (state, { error }) => ({
    ...state,
    message: messages.errorMessage
  })),


  on(authActions.addGameToFavsSuccess, (state, { id }) => {
    const favs_games: any = { ids_favs_games: [...state.ids_favs_games, id] };
    localStorage.setItem("favs_games", JSON.stringify(favs_games));

    return {
      ...state,
      ids_favs_games: [...state.ids_favs_games, id],
      message: {...messages.addGameToFavsSuccess}
    }
  }),
  on(authActions.loadFavsGamesSuccess, (state, { ids_favs_games }) => {
    const favs_games: any = { ids_favs_games: ids_favs_games };
    localStorage.setItem("favs_games", JSON.stringify(favs_games));

    return {
      ...state,
      ids_favs_games: ids_favs_games
    }
  }),
  on(authActions.removeGameToFavsSuccess, (state, { id }) => {
    const favs_games: any = { ids_favs_games: state.ids_favs_games.filter(id_game => id_game != id) };
    localStorage.setItem("favs_games", JSON.stringify(favs_games));

    return{
      ...state,
      ids_favs_games: state.ids_favs_games.filter(id_game => id_game != id),
      message: {...messages.removeGameToFavsSuccess}
    }
}),
);
