import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ComplexitiesService } from 'src/services/complexities.service';
import * as complexitiesActions from './complexities.actions';

@Injectable()
export class ComplexitiesEffects {

  loadTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(complexitiesActions.loadComplexities),
      mergeMap(() => this.complexitiesService.getComplexities()
        .pipe(
          map((complexities: any) => complexitiesActions.loadComplexitiesSuccess({ complexities: complexities })),
          catchError(err => of(complexitiesActions.loadComplexitiesFail({ error: err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private complexitiesService: ComplexitiesService
  ) { }
}
