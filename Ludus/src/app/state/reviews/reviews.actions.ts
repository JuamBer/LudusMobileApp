import { createAction, props } from '@ngrx/store';
import { Review } from 'src/models/Review';

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
