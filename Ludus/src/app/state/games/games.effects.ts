import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as gamesActions from './games.actions';
import { EMPTY, EmptyError } from 'rxjs';
import { GameService } from 'src/services/game.service';
import { Game } from 'src/models/Game';

@Injectable()
export class GamesEffects {

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
      mergeMap(() => this.gameService.getPopularGames()
        .pipe(
          map((games: any) => gamesActions.loadPopularGamesSuccess({ games: games })),
          catchError(err => of(gamesActions.loadPopularGamesFail({ error: err })))
        )
      )
    )
  );

  loadSearchResultsGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadSearchResultsGames),
      mergeMap((res) => { console.log(res);
       return this.gameService.getSearchResultsGames(res.search)
        .pipe(
          map((games: any) => gamesActions.loadSearchResultsGamesSuccess({ games: games })),
          catchError(err => of(gamesActions.loadSearchResultsGamesFail({ error: err })))
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
