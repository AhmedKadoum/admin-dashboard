import { Patient } from '../slices/patients/patient.store';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PatientActions from '../slices/patients/patient.store';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { ApiPatientService } from '../../../services/patient/api/api-patient.service';

@Injectable()
export class PatientEffects {
  private apiPatientService: ApiPatientService = inject(ApiPatientService);
  private actions$: Actions = inject(Actions);


  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.actions.loadPatients),
      tap(() => console.log('🔄 Patients effect triggered')),
      exhaustMap(() =>
        this.apiPatientService.loadPatientsData().pipe(
          map((response:any) =>
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
  updatePatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.actions.updatePatient),
      tap(() => console.log('🔄 update Patients effect triggered')),
      exhaustMap((patient) =>
        this.apiPatientService.loadPatientsData().pipe(
          map(() =>
            PatientActions.actions.updatePatientSuccess(patient)
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
    DeletePatients$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PatientActions.actions.removePatients),
        tap(() => console.log('🔄remove patients effect triggered')),
        exhaustMap(({PatientId}) =>
          this.apiPatientService.loadPatientsData().pipe(
            map(() =>
              PatientActions.actions.removePatientsSuccess({PatientsId:PatientId}),
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
    CreatePatients$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PatientActions.actions.createPatient),
        tap(() => console.log('🔄create patients effect triggered')),
        exhaustMap((Patient) =>
          this.apiPatientService.loadPatientsData().pipe(
            map(() =>
              PatientActions.actions.createPatientSuccess( Patient ),
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
    loadProfiles$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PatientActions.actions.loadProfiles),
        tap(() => console.log('🔄load profiles effect triggered')),
        exhaustMap(({PatientId}) =>
          this.apiPatientService.loadPatientsDataById(PatientId).pipe(
            map((response) =>
              PatientActions.actions.loadProfilesSuccess({data:response} ),
            ),
            catchError((error) =>
              of(
                PatientActions.actions.loadProfilesFailure({
                  error: error.message,
                })
              )
            )
          )
        )
      )
    );
  // searchPatients$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PatientActions.actions.searchPatients),
  //     mergeMap(({ query }) =>
  //       this.apiPatientService.searchPatients(query).pipe(
  //         map((patients) =>
  //           PatientActions.actions.searchPatientsSuccess({ patients })
  //         ),
  //         catchError((error) =>
  //           of(PatientActions.actions.searchPatientsFailure({ error: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );
}
