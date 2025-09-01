import { Patient } from '../slices/patients/patient.store';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PatientActions from '../slices/patients/patient.store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ApiPatientService } from '../../../services/patient/api/api-patient.service';

@Injectable()
export class PatientEffects {
  private apiPatientService: ApiPatientService = inject(ApiPatientService);
  private actions$: Actions = inject(Actions);


  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.actions.loadPatients),
      tap(() => console.log('🔄 Patients effect triggered')),
      mergeMap(() =>
        this.apiPatientService.loadPatientsData().pipe(
          map((response: Patient[]) =>
            PatientActions.actions.loadPatientsSuccess({ data: response })
          ),
          catchError((error) =>
            of(
              PatientActions.actions.loadPatientsFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
  searchPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.actions.searchPatients),
      mergeMap(({ query }) =>
        this.apiPatientService.searchPatients(query).pipe(
          map((patients) =>
            PatientActions.actions.searchPatientsSuccess({ patients })
          ),
          catchError((error) =>
            of(PatientActions.actions.searchPatientsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
