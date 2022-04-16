import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as reviewsActions from './reviews.actions';
import { ReviewService } from 'src/services/review.service';

@Injectable()
export class ReviewsEffects {

  iHaveDoneAReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.getIfIHaveDoneAReview),
      mergeMap((res) => this.reviewService.getIfIHaveDoneAReview(res.user_id, res.game_id)
        .pipe(
          map((iHaveDoneAReview: any) => reviewsActions.getIfIHaveDoneAReviewSuccess({ iHaveDoneAReview: iHaveDoneAReview })),
          catchError(err => of(reviewsActions.getIfIHaveDoneAReviewFail({ error: err })))
        )
      )
    )
  );

  loadReviewsByGameId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.loadReviewsByGameId),
      mergeMap((res) => this.reviewService.getReviewsByGameId(res.id)
        .pipe(
          map((reviews: any) => reviewsActions.loadReviewsByGameIdSuccess({ reviews: reviews })),
          catchError(err => of(reviewsActions.loadReviewsByGameIdFail({ error: err })))
        )
      )
    )
  );

  loadReviewsByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.loadReviewsByUserId),
      mergeMap((res) => this.reviewService.getReviewsByUserId(res.id)
        .pipe(
          map((reviews: any) => reviewsActions.loadReviewsByUserIdSuccess({ reviews: reviews })),
          catchError(err => of(reviewsActions.loadReviewsByUserIdFail({ error: err })))
        )
      )
    )
  );

  createReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.createReview),
      mergeMap((res) => {
        console.log(res);
        return from(this.reviewService.create(res.review))
          .pipe(
            map(() => reviewsActions.createReviewSuccess({ review: res.review })),
            catchError(err => of(reviewsActions.createReviewFail({ error: err })))
          )
        }
      )
    )
  );



  constructor(
    private actions$: Actions,
    private reviewService: ReviewService
  ) { }
}
