import { Medication } from '../slices/medications/medication.store';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MedicationActions from '../slices/medications/medication.store';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { ApiMedicationService } from '../../../services/medication/api/api-medication.service';

@Injectable()
export class MedicationEffects {
  private apiMedicationService: ApiMedicationService = inject(ApiMedicationService);
  private actions$: Actions = inject(Actions);

  // 🔹 Effect listens for Login action
  loadMedications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MedicationActions.actions.loadMedications),
      tap(() => console.log('🔄 Medications effect triggered')),
      exhaustMap(() =>
        this.apiMedicationService.loadMedicationsData().pipe(
          map((response: Medication[]) =>
            MedicationActions.actions.loadMedicationsSuccess({ data: response })
          ),
          catchError((error) =>
            of(
              MedicationActions.actions.loadMedicationsFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}
