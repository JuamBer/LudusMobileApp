import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, concatMap, switchMap, first } from 'rxjs/operators';
import * as gamesActions from './games.actions';
import { EMPTY, EmptyError } from 'rxjs';
import { GameService } from 'src/services/game.service';
import { Game } from 'src/models/Game';
import * as reviewsActions from '../reviews/reviews.actions';

@Injectable()
export class GamesEffects {

  updateAverageRatingCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.createReviewSuccess),
      switchMap((action) => from(this.gameService.getGame(action.review.id_game))
        .pipe(
          first(),
          switchMap((game: any) => from(this.gameService.updateAverageRating(game, action.review, "create"))
            .pipe(
              map((game: any) => gamesActions.updateAverageRatingSuccess({ game: game })),
              catchError(err => of(gamesActions.updateAverageRatingFail({ error: err })))
            )
          ),
          catchError(err => of(gamesActions.updateAverageRatingFail({ error: err })))
        )
      )
    )
  );

  updateAverageRatingUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.updateReviewSuccess),
      switchMap((action) => from(this.gameService.getGame(action.review.id_game))
        .pipe(
          first(),
          switchMap((game: any) => from(this.gameService.updateAverageRating(game, action.review, "update", action.oldReview))
            .pipe(
              map((game: any) => gamesActions.updateAverageRatingSuccess({ game: game })),
              catchError(err => of(gamesActions.updateAverageRatingFail({ error: err })))
            )
          ),
          catchError(err => of(gamesActions.updateAverageRatingFail({ error: err })))
        )
      )
    )
  );

  updateAverageRatingDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.deleteReviewSuccess),
      switchMap((action) => from(this.gameService.getGame(action.review.id_game))
        .pipe(
          first(),
          switchMap((game: any) => from(this.gameService.updateAverageRating(game, action.review, "delete"))
            .pipe(
              map((game: any) => gamesActions.updateAverageRatingSuccess({ game: game })),
              catchError(err => of(gamesActions.updateAverageRatingFail({ error: err })))
            )
          ),
          catchError(err => of(gamesActions.updateAverageRatingFail({ error: err })))
        )
      )
    )
  );

loadGame$ = createEffect(() =>
  this.actions$.pipe(
    ofType(gamesActions.loadGame),
    mergeMap((res) => this.gameService.getGame(res.id)
      .pipe(
        map((game: any) => gamesActions.loadGameSuccess({ game: game })),
        catchError(err => of(gamesActions.loadGameFail({ error: err })))
      )
    )
  )
);

loadGames$ = createEffect(() =>
  this.actions$.pipe(
    ofType(gamesActions.loadGames),
    mergeMap(() => this.gameService.getGames()
      .pipe(
        map((games: any) => gamesActions.loadGamesSuccess({ games: games })),
        catchError(err => of(gamesActions.loadGamesFail({ error: err })))
      )
    )
  )
);

loadQuickGames$ = createEffect(() =>
  this.actions$.pipe(
    ofType(gamesActions.loadQuickGames),
    mergeMap(() => this.gameService.getQuickGames()
      .pipe(
        map((games: any) => gamesActions.loadQuickGamesSuccess({ games: games })),
        catchError(err => of(gamesActions.loadQuickGamesFail({ error: err })))
      )
    )
  )
);

loadCardGames$ = createEffect(() =>
  this.actions$.pipe(
    ofType(gamesActions.loadCardGames),
    mergeMap(() => this.gameService.getCardGames()
      .pipe(
        map((games: any) => gamesActions.loadCardGamesSuccess({ games: games })),
        catchError(err => of(gamesActions.loadCardGamesFail({ error: err })))
      )
    )
  )
);

loadPopularGames$ = createEffect(() =>
  this.actions$.pipe(
    ofType(gamesActions.loadPopularGames),
    mergeMap((action) => this.gameService.getPopularGames(action.scrollFilter)
      .pipe(
        map((games: any) => gamesActions.loadPopularGamesSuccess({ games: games })),
        catchError(err => of(gamesActions.loadPopularGamesFail({ error: err })))
      )
    )
  )
);

loadFilteredResultsGames$ = createEffect(() =>
  this.actions$.pipe(
    ofType(gamesActions.loadFilteredGames),
    mergeMap((res) => {
      return this.gameService.getFilteredResultsGames(res.filter)
        .pipe(
          map((games: any) => {

            if (games) {
              return gamesActions.loadFilteredGamesSuccess({ games: games })
            } else {
              return gamesActions.loadFilteredGamesSuccess({ games: [] })
            }
          }),
          catchError(err => of(gamesActions.loadFilteredGamesSuccess({ games: [] })))
        )
    }
    )
  )
);



constructor(
  private actions$: Actions,
  private gameService: GameService
) { }
}
