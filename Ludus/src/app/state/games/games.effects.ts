import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, concatMap, switchMap, first } from 'rxjs/operators';
import * as gamesActions from './games.actions';
import { EMPTY, EmptyError } from 'rxjs';
import { GameService } from 'src/services/game.service';
import { Game } from 'src/models/Game';
import * as reviewsActions from '../reviews/reviews.actions';
import { Page, PageType } from 'src/models/Page.model';

@Injectable()
export class GamesEffects {

  transformSnapshotChanges(snapshotChanges: any, limit: number, type: PageType): Page<Game>{
    const page: Page<Game> = {
      items: snapshotChanges.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        }
      }),
      primerDoc: Object.freeze(snapshotChanges[0].payload.doc),
      ultimoDoc: Object.freeze({ ...snapshotChanges[snapshotChanges.length - 1].payload.doc }),
      limit: limit,
      type: type
    }

    return page;
  }

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

  loadSpecialGame1$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadSpecialGame1),
      mergeMap((res) => this.gameService.getGame(res.id)
        .pipe(
          map((game: any) => gamesActions.loadSpecialGame1Success({ game: game })),
          catchError(err => of(gamesActions.loadSpecialGame1Fail({ error: err })))
        )
      )
    )
  );

  loadSpecialGame2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadSpecialGame2),
      mergeMap((res) => this.gameService.getGame(res.id)
        .pipe(
          map((game: any) => gamesActions.loadSpecialGame2Success({ game: game })),
          catchError(err => of(gamesActions.loadSpecialGame2Fail({ error: err })))
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

  //LOAD QUICK GAMES
  loadQuickGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadQuickGames),
      mergeMap((action) => this.gameService.getQuickGames(action.page)
        .pipe(
          map((snapshotChanges: any) => {
            const page = this.transformSnapshotChanges(snapshotChanges, action.page.limit, action.page.type);
            return gamesActions.loadQuickGamesSuccess({ page: page })
          }),
          catchError(err => of(gamesActions.loadQuickGamesFail({ error: err })))
        )
      )
    )
  );
  loadMoreQuickGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadMoreQuickGames),
      mergeMap((action) => this.gameService.getMoreQuickGames(action.page)
        .pipe(
          map((snapshotChanges: any) => {
            const page = this.transformSnapshotChanges(snapshotChanges, action.page.limit, action.page.type);
            return gamesActions.loadMoreQuickGamesSuccess({ page: page })
          }),
          catchError(err => of(gamesActions.loadMoreQuickGamesFail({ error: err })))
        )
      )
    )
  );

  //LOAD CARD GAMES
  loadCardGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadCardGames),
      mergeMap((action) => this.gameService.getCardGames(action.page)
        .pipe(
          map((snapshotChanges: any) => {
            const page = this.transformSnapshotChanges(snapshotChanges, action.page.limit, action.page.type);
            return gamesActions.loadCardGamesSuccess({ page: page })
          }),
          catchError(err => of(gamesActions.loadCardGamesFail({ error: err })))
        )
      )
    )
  );
  loadMoreCardGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadMoreCardGames),
      mergeMap((action) => this.gameService.getMoreCardGames(action.page)
        .pipe(
          map((snapshotChanges: any) => {
            const page = this.transformSnapshotChanges(snapshotChanges, action.page.limit, action.page.type);
            return gamesActions.loadMoreCardGamesSuccess({ page: page })
          }),
          catchError(err => of(gamesActions.loadMoreCardGamesFail({ error: err })))
        )
      )
    )
  );

  //LOAD POPULAR GAMES
  loadPopularGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadPopularGames),
      mergeMap((action) => this.gameService.getPopularGames(action.page)
        .pipe(
          map((snapshotChanges: any) => {
            const page = this.transformSnapshotChanges(snapshotChanges, action.page.limit, action.page.type);
            return gamesActions.loadPopularGamesSuccess({ page: page })
          }),
          catchError(err => of(gamesActions.loadPopularGamesFail({ error: err })))
        )
      )
    )
  );
  loadMorePopularGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadMorePopularGames),
      mergeMap((action) => this.gameService.getMorePopularGames(action.page)
        .pipe(
          map((snapshotChanges: any) => {
            const page = this.transformSnapshotChanges(snapshotChanges, action.page.limit, action.page.type);
            return gamesActions.loadMorePopularGamesSuccess({ page: page })
          }),
          catchError(err => of(gamesActions.loadMorePopularGamesFail({ error: err })))
        )
      )
    )
  );


  //LOAD FILTERED RESULTS
  loadFilteredGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadFilteredGames),
      mergeMap((action) => {
        return this.gameService.getFilteredResultsGames(action.page, action.filter)
          .pipe(
            map((snapshotChanges: any) => {
              if (snapshotChanges) {
                const page = this.transformSnapshotChanges(snapshotChanges, action.page.limit, action.page.type);
                return gamesActions.loadFilteredGamesSuccess({ page: page })
              } else {
                return gamesActions.loadFilteredGamesSuccess({ page: null })
              }
            }),
            catchError(err => of(gamesActions.loadFilteredGamesSuccess({ page: null })))
          )
      }
      )
    )
  );
  loadMoreFilteredGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadMoreFilteredGames),
      mergeMap((action) => {
        return this.gameService.getMoreFilteredResultsGames(action.page, action.filter)
          .pipe(
            map((snapshotChanges: any) => {
              if (snapshotChanges) {
                const page = this.transformSnapshotChanges(snapshotChanges, action.page.limit, action.page.type);
                return gamesActions.loadMoreFilteredGamesSuccess({ page: page })
              } else {
                return gamesActions.loadMoreFilteredGamesSuccess({ page: null })
              }
            }),
            catchError(err => of(gamesActions.loadMoreFilteredGamesSuccess({ page: null })))
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
