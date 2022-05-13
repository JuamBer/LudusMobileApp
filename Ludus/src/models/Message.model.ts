export enum Type {
  LOADING,
  ERROR,

  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  CHANGE_NAME_SUCCESS,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,

  ADD_GAME_TO_FAVS_SUCCESS,
  REMOVE_GAME_TO_FAVS_SUCCESS,

  CREATE_REVIEW_SUCCESS,
  DELETE_REVIEW_SUCCESS,
  UPDATE_REVIEW_SUCCESSS,

  LOAD_MORE_GAMES_SUCCESS,

  CREATE_GAME_SUCCESS,
  UPDATE_GAME_SUCCESS,
  DELETE_GAME_SUCCESS
}

export interface Message {
  text: string;
  icon: string;
  color: "primary" | "secondary" |  "tertiary" | "success" | "warning" | "danger" | "light" | "medium"| "dark";
  type: Type
}
