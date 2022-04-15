import { createReducer, on } from '@ngrx/store';
import { Review } from 'src/models/Review';
import * as reviewsActions from './reviews.actions';

export interface State {
  game_reviews: Review[],
  user_reviews: Review[],
}

export const initialState: State = {
  game_reviews: [],
  user_reviews: []
}

export const reviewsReducer = createReducer(initialState,

  on(reviewsActions.loadReviewsByGameIdSuccess, (state, { reviews }) => ({ ...state, game_reviews: reviews})),
  on(reviewsActions.loadReviewsByUserIdSuccess, (state, { reviews }) => ({ ...state, user_reviews: reviews })),
  on(reviewsActions.createReviewSuccess, (state, { review }) => ({ ...state, game_reviews: [...state.game_reviews, review] })),
);
