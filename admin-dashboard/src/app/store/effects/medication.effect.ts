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


  loadMedications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MedicationActions.actions.loadMedications),
      tap(() => console.log('🔄 Medications effect triggered')),
      exhaustMap(() =>
        this.apiMedicationService.loadMedicationsData().pipe(
          map((response: any) =>
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
DeleteMedications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MedicationActions.actions.removeMedications),
      tap(() => console.log('🔄remove Medications effect triggered')),
      exhaustMap(({MedicationsId}) =>
        this.apiMedicationService.loadMedicationsData().pipe(
          map(() =>
            MedicationActions.actions.removeMedicationsSuccess({MedicationsId}),
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
  CreateMedications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MedicationActions.actions.createMedication),
      tap(() => console.log('🔄create Medications effect triggered')),
      exhaustMap(({name:MedicationName}) =>
        this.apiMedicationService.loadMedicationsData().pipe(
          map(() =>
            MedicationActions.actions.createMedicationSuccess( {name:MedicationName} ),
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
  UpdateMedications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MedicationActions.actions.updateMedication),
      tap(() => console.log('🔄update Medications effect triggered')),
      exhaustMap((Medication) =>
        this.apiMedicationService.loadMedicationsData().pipe(
          map(() =>
            MedicationActions.actions.updateMedicationSuccess({name:Medication.name,MedicationId:Medication.MedicationId}),
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


