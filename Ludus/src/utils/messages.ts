import { Message, Type } from "src/models/Message.model";

//GENERIC
export const loadingMessage: Message = {
  text: "Cargando...",
  icon: "information-circle-outline",
  color: "light",
  type: Type.LOADING
}
export const errorMessage: Message = {
  text: "Upsss, Ha Habido Un Error",
  icon: "information-circle-outline",
  color: "danger",
  type: Type.ERROR
}

//REGISTER
export const registerSuccess: Message = {
  text: "¡ Bienvenido a Ludus !",
  icon: "information-circle-outline",
  color: "success",
  type: Type.REGISTER_SUCCESS
}

//LOGIN
export const loginUserSuccess: Message = {
  text: "¡ Bienvenido/a !",
  icon: "information-circle-outline",
  color: "success",
  type: Type.LOGIN_SUCCESS
}
export const loginUserFail: Message = {
  text: "Error en el login",
  icon: "information-circle-outline",
  color: "danger",
  type: Type.LOGIN_ERROR
}
//LOGOUT
export const logoutUserSuccess: Message = {
  text: "¡ Esperamos Verte Pronto !",
  icon: "information-circle-outline",
  color: "success",
  type: Type.LOGOUT_SUCCESS
}

//CHANGE NAME
export const changeNameSuccess: Message = {
  text: "¡ Nombre Cambiado Con Éxito !",
  icon: "information-circle-outline",
  color: "success",
  type: Type.CHANGE_NAME_SUCCESS
}
//CHANGE NAME
export const changeEmailSuccess: Message = {
  text: "¡ Email Cambiado Con Éxito !",
  icon: "information-circle-outline",
  color: "success",
  type: Type.CHANGE_EMAIL_SUCCESS
}
//CHANGE NAME
export const changePasswordSuccess: Message = {
  text: "¡ Contraseña Cambiada Con Éxito !",
  icon: "information-circle-outline",
  color: "success",
  type: Type.CHANGE_PASSWORD_SUCCESS
}



export const addGameToFavsSuccess: Message = {
  text: "¡ Juego Guardado Con Éxito !",
  icon: "information-circle-outline",
  color: "success",
  type: Type.ADD_GAME_TO_FAVS_SUCCESS
}

export const removeGameToFavsSuccess: Message = {
  text: "¡ Juego Eliminado De Tus Guardados Con Éxito !",
  icon: "information-circle-outline",
  color: "success",
  type: Type.REMOVE_GAME_TO_FAVS_SUCCESS
}


//REVIEWS
export const createReviewSuccess: Message = {
  text: "¡ Opinion Publicada Con Éxito !",
  icon: "information-circle-outline",
  color: "success",
  type: Type.CREATE_REVIEW_SUCCESS
}
export const deleteReviewSuccess: Message = {
  text: "¡ Opinion Eliminada Con Éxito !",
  icon: "information-circle-outline",
  color: "success",
  type: Type.DELETE_REVIEW_SUCCESS
}
export const updateReviewSuccess: Message = {
  text: "¡ Opinion Actulizada Con Éxito !",
  icon: "information-circle-outline",
  color: "success",
  type: Type.UPDATE_REVIEW_SUCCESSS
}
