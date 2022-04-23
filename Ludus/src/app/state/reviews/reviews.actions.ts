import { createAction, props } from '@ngrx/store';
import { Game } from 'src/models/Game';
import { Review } from 'src/models/Review';

//LOAD GAME
export const getIfIHaveDoneAReview = createAction(
  '[Games] get If I Have Done A Review',
  props<{ user_id: string, game_id: string }>()
);
export const getIfIHaveDoneAReviewSuccess = createAction(
  '[Games] get If I Have Done A Review Success',
  props<{ iHaveDoneAReview: boolean }>()
);
export const getIfIHaveDoneAReviewFail = createAction(
  '[Games] get If I Have Done A Review Fail',
  props<{ error: any }>()
);

//LOAD REVIEWS BY GAME ID
export const loadReviewsByGameId = createAction(
  '[Reviews] load Reviews By Game Id',
  props<{ id: string }>()
);
export const loadReviewsByGameIdSuccess = createAction(
  '[Reviews] load Reviews By Game Id Success',
  props<{ reviews: Review[] }>()
);
export const loadReviewsByGameIdFail = createAction(
  '[Reviews] load Reviews By Game Id Fail',
  props<{ error: any }>()
);


//LOAD REVIEWS BY USER ID
export const loadReviewsByUserId = createAction(
  '[Reviews] load Reviews By User Id',
  props<{ id: string }>()
);
export const loadReviewsByUserIdSuccess = createAction(
  '[Reviews] load Reviews By User Id Success',
  props<{ reviews: Review[] }>()
);
export const loadReviewsByUserIdFail = createAction(
  '[Reviews] load Reviews By User Id Fail',
  props<{ error: any }>()
);

//CREATE REVIEW
export const createReview = createAction(
  '[Reviews] create Review',
  props<{ review: Review }>()
);
export const createReviewSuccess = createAction(
  '[Reviews] create Review Success',
  props<{ review: Review }>()
);
export const createReviewFail = createAction(
  '[Reviews] create Review Fail',
  props<{ error: any }>()
);

//DELETE REVIEW
export const deleteReview = createAction(
  '[Reviews] delete Review',
  props<{ review: Review }>()
);
export const deleteReviewSuccess = createAction(
  '[Reviews] delete Review Success',
  props<{ review: Review }>()
);
export const deleteReviewFail = createAction(
  '[Reviews] delete Review Fail',
  props<{ error: any }>()
);

//UPDATE REVIEW
export const updateReview = createAction(
  '[Reviews] update Review',
  props<{ review: Review, oldReview: Review }>()
);
export const updateReviewSuccess = createAction(
  '[Reviews] update Review Success',
  props<{ review: Review, oldReview: Review }>()
);
export const updateReviewFail = createAction(
  '[Reviews] update Review Fail',
  props<{ error: any }>()
);
