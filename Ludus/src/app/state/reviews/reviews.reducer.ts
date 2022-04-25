import { createReducer, on } from '@ngrx/store';
import { Review } from 'src/models/Review';
import * as reviewsActions from './reviews.actions';
import * as messages from 'src/utils/messages';
import { Message } from 'src/models/Message.model';

export interface State {
  game_reviews: Review[],
  user_reviews: Review[],
  iHaveDoneAReview: boolean;
  message: Message
}

export const initialState: State = {
  game_reviews: [],
  user_reviews: [],
  iHaveDoneAReview: null,
  message: undefined
}

export const reviewsReducer = createReducer(initialState,

  on(reviewsActions.getIfIHaveDoneAReviewSuccess, (state, { iHaveDoneAReview }) => ({ ...state, iHaveDoneAReview: iHaveDoneAReview })),
  on(reviewsActions.loadReviewsByGameIdSuccess, (state, { reviews }) => ({ ...state, game_reviews: reviews})),
  on(reviewsActions.loadReviewsByUserIdSuccess, (state, { reviews }) => ({ ...state, user_reviews: reviews })),
  on(reviewsActions.createReviewSuccess, (state, { review }) => ({
    ...state,
    game_reviews: [...state.game_reviews, review],
    message: { ...messages.createReviewSuccess }
  })),
  on(reviewsActions.deleteReviewSuccess, (state, { review }) => {
    return {
      ...state,
      game_reviews: state.game_reviews.filter(reviewf => reviewf.id != review.id),
      user_reviews: state.user_reviews.filter(reviewf => reviewf.id != review.id),
      message: { ...messages.deleteReviewSuccess }
    }
  }),
  on(reviewsActions.updateReviewSuccess, (state, { review }) => {
    return {
      ...state,
      game_reviews: state.game_reviews.map(item => {
        if (item.id == review.id){
          return review
        }else{
          return item
        }
      }),
      user_reviews: state.user_reviews.map(item => {
        if (item.id == review.id) {
          return review
        } else {
          return item
        }
      }),
      message: { ...messages.updateReviewSuccess }
    }
  }),
);
