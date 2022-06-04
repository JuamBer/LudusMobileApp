import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY, EmptyError } from 'rxjs';
import { UserService } from 'src/services/user.service';
import * as authActions from './auth.actions';
import * as gameActions from '../games/games.actions';

import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/User';
//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as userActions from 'src/app/state/auth/auth.actions';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthEffects {

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      mergeMap(action =>
        this.authService.register(action.registerDTO).then(
          (res: any) => {
            const userLogged: User = {
              id: res.user.uid,
              name: res.user.displayName,
              email: res.user.email
            }

            this.store.dispatch(authActions.changeName({ name: action.registerDTO.name }));

            return authActions.registerSuccess({ user: userLogged })
          }
        ).catch(
          err => authActions.registerFail({ error: err })
        )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginUser),
      mergeMap(res =>
        this.authService.loginUser(res.loginDTO).then(
          (res: any) => {
            const userLogged: User = {
              id: res.user.uid,
              name: res.user.displayName,
              email: res.user.email
            }
            return authActions.loginUserSuccess({ user: userLogged })
          }
        ).catch(
          err => authActions.loginUserFail({ error: err })
        )
      )
    )
  );

  loginUserWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginUserWithGoogle),
      mergeMap(res =>
        this.authService.googleLogin().then(
          (res: any) => {
            const userLogged: User = {
              id: res.user.uid,
              name: res.user.displayName,
              email: res.user.email
            }
            return authActions.loginUserWithGoogleSuccess({ user: userLogged })
          }
        ).catch(
          err => authActions.loginUserWithGoogleFail({ error: err })
        )
      )
    )
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logoutUser),
      mergeMap(() =>
        this.authService.logOut().then(
          res => {
            return authActions.logoutUserSuccess()
          }
        ).catch(
          err => {
            return authActions.logoutUserFail({ error: err })
          }
        )
      )
    )
  );

  loadMyUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loadMyUser),
      mergeMap((res) => this.userService.getUser(res.id)
        .pipe(
          map((user: any) => authActions.loadMyUserSuccess({ user: user })),
          catchError(err => of(authActions.loadMyUserFail({ error: err })))
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

  changeName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.changeName),
      mergeMap(action =>
        this.authService.updateName(action.name).then(
          () => {
            return authActions.changeNameSuccess({ name: action.name })
          }
        ).catch(
          err => authActions.changeNameFail({ error: err })
        )
      )
    )
  );

  changeEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.changeEmail),
      mergeMap(action =>
        this.authService.updateEmail(action.email).then(
          () => {
            return authActions.changeEmailSuccess({ email: action.email })
          }
        ).catch(
          err => authActions.changeEmailFail({ error: err })
        )
      )
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.changePassword),
      mergeMap(action =>
        this.authService.updatePassword(action.password).then(
          () => {
            return authActions.changePasswordSuccess({ password: action.password })
          }
        ).catch(
          err => authActions.changePasswordFail({ error: err })
        )
      )
    )
  );

  addGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.createGameSuccess),
      mergeMap((action) => {
        return from(this.userService.addGame(action.id_user, action.game))
          .pipe(
            map((res) => authActions.createGameSuccess({ id_user: action.id_user, game: action.game })),
            catchError(err => of(authActions.createGameFail({ error: err })))
          )
      }
      )
    )
  );

  deleteGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.deleteGameSuccess),
      mergeMap((action) => {
        return from(this.userService.deleteGame(action.id_user, action.game))
          .pipe(
            map((res) => authActions.deleteGameSuccess({ id_user: action.id_user, game: action.game })),
            map((res) => authActions.removeGameToFavs({ id_user: action.id_user, game: action.game })),
            catchError(err => of(authActions.deleteGameFail({ error: err })))
          )
      }
      )
    )
  );




  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService,
    private store: Store<AppState>,
  ) { }
}
