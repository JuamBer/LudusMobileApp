import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as reviewsActions from './types.actions';
import { TypeService } from 'src/services/type.service';
import { Type } from 'src/models/Type.model';

@Injectable()
export class TypesEffects {

  loadTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reviewsActions.loadTypes),
      mergeMap(() => this.typeService.getTypes()
        .pipe(
          map((types: any) => reviewsActions.loadTypesSuccess({ types: types })),
          catchError(err => of(reviewsActions.loadTypesFail({ error: err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private typeService: TypeService
  ) { }
}
