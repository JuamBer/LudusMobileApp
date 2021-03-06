import { createReducer, on } from '@ngrx/store';
import { Game } from 'src/models/Game';
import { Message } from 'src/models/Message.model';
import { User } from 'src/models/User';
import * as authActions from './auth.actions';
import * as messages from 'src/utils/messages';

export interface State {
  user: User | null;
  message: Message | null;
}

export const initialState: State = {
  user: null,
  message: null
}

export const authReducer = createReducer(initialState,

  //LOGIN
  on(authActions.createGameSuccess, (state, { game }) => ({
    ...state,
    user: {
      ...state.user,
      ids_games: [
        ...state.user.ids_games,
        game.id
      ]
    }
  })),

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

  //create
  on(authActions.createGame, (state, { game }) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(authActions.createGameSuccess, (state, { game }) => {
    return {
      ...state,
      user: {
        ...state.user,
        ids_games: [
          ...state.user.ids_games,
          game.id
        ]
      },
      message: { ...messages.createGameSuccess }
    }
  }),
  on(authActions.createGameFail, (state, { error }) => ({
    ...state,
    message: messages.errorMessage
  })),
  //update
  on(authActions.updateGame, (state, { game }) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(authActions.updateGameSuccess, (state, { game }) => {
    return {
      ...state,
      message: { ...messages.updateGameSuccess }
    }
  }),
  on(authActions.createGameFail, (state, { error }) => ({
    ...state,
    message: messages.errorMessage
  })),
  //delete
  on(authActions.deleteGame, (state, { game }) => ({
    ...state,
    message: messages.loadingMessage
  })),
  on(authActions.deleteGameSuccess, (state, { game }) => {
    return {
      ...state,
      user: {
        ...state.user,
        ids_games: state.user.ids_games.filter(item => item != game.id)
      },
      message: { ...messages.createGameSuccess }
    }
  }),
  on(authActions.deleteGameFail, (state, { error }) => ({
    ...state,
    message: messages.errorMessage
  })),


  on(authActions.addGameToFavsSuccess, (state, { id }) => {
    return {
      ...state,
      user: {
        ...state.user,
        favs_games: [...state.user.favs_games, id]
      },
      message: {...messages.addGameToFavsSuccess}
    }
  }),

  on(authActions.removeGameToFavsSuccess, (state, { id }) => {
    return{
      ...state,
      user: {
        ...state.user,
        favs_games: state.user.favs_games.filter(id_game => id_game != id)
      },
      message: {...messages.removeGameToFavsSuccess}
    }
  }),

  on(authActions.loadMyUserSuccess, (state, { user }) => {
    return {
      ...state,
      user: user
    }
  }),
);
