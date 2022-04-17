import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY, EmptyError } from 'rxjs';
import { UserService } from 'src/services/user.service';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {

  loadFavsGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loadFavsGames),
      mergeMap((res) => this.userService.getFavsGames(res.id)
        .pipe(
          map((ids_favs_games: any) => authActions.loadFavsGamesSuccess({ ids_favs_games: ids_favs_games })),
          catchError(err => of(authActions.loadFavsGamesFail({ error: err })))
        )
      )
    )
  );

  addGameToFavs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.addGameToFavs),
      mergeMap((res) => {
        return from(this.userService.addGameToFavs(res.id_user, res.game))
          .pipe(
            map(() => authActions.addGameToFavsSuccess({ id: res.game.id })),
            catchError(err => of(authActions.addGameToFavsFail({ error: err })))
          )
      }
      )
    )
  );

  removeGameToFavs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.removeGameToFavs),
      mergeMap((res) => {
        return from(this.userService.removeGameToFavs(res.id_user, res.game))
          .pipe(
            map(() => authActions.removeGameToFavsSuccess({ id: res.game.id })),
            catchError(err => of(authActions.removeGameToFavsFail({ error: err })))
          )
      }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}
