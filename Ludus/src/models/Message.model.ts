export enum Type {
  LOADING,
  ERROR,

  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  CHANGE_NAME_SUCCESS,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_PASSWORD_SUCCESS
}

export interface Message {
  text: string;
  icon: string;
  color: "primary" | "secondary" |  "tertiary" | "success" | "warning" | "danger" | "light" | "medium"| "dark";
  type: Type
}
