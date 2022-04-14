import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import * as authActions from './auth.actions';
import { EMPTY, EmptyError } from 'rxjs';

@Injectable()
export class MovieEffects {


  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }
}
