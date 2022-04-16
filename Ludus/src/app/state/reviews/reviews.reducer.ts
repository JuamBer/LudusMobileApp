import { createReducer, on } from '@ngrx/store';
import { Review } from 'src/models/Review';
import * as reviewsActions from './reviews.actions';

export interface State {
  game_reviews: Review[],
  user_reviews: Review[],
  iHaveDoneAReview: boolean;
}

export const initialState: State = {
  game_reviews: [],
  user_reviews: [],
  iHaveDoneAReview: true
}

export const reviewsReducer = createReducer(initialState,

  on(reviewsActions.getIfIHaveDoneAReviewSuccess, (state, { iHaveDoneAReview }) => ({ ...state, iHaveDoneAReview: iHaveDoneAReview })),
  on(reviewsActions.loadReviewsByGameIdSuccess, (state, { reviews }) => ({ ...state, game_reviews: reviews})),
  on(reviewsActions.loadReviewsByUserIdSuccess, (state, { reviews }) => ({ ...state, user_reviews: reviews })),
  on(reviewsActions.createReviewSuccess, (state, { review }) => ({ ...state, game_reviews: [...state.game_reviews, review] })),
  on(reviewsActions.deleteReviewSuccess, (state, { id }) => {
    console.log(id);
    console.log(state);

    return {
      ...state,
      game_reviews: state.game_reviews.filter(review => review.id != id),
      user_reviews: state.user_reviews.filter(review => review.id != id)
    }
  }),
);
