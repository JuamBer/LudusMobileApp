import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as reviewsActions from './genders.actions';
import { GenderService } from 'src/services/gender.service';

@Injectable()
export class GendersEffects {

  loadGenders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.loadGenders),
      mergeMap(() => this.genderService.getGenders()
        .pipe(
          map((genders: any) => reviewsActions.loadGendersSuccess({ genders: genders })),
          catchError(err => of(reviewsActions.loadGendersFail({ error: err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private genderService: GenderService
  ) { }
}
