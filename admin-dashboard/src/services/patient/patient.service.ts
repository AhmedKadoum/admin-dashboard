
import {
  PatientsFeature,
  PatientsState,
  Patient,
} from './../../app/store/slices/patients/patient.store';
import { inject, Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { actions } from '../../app/store/slices/patients/patient.store';
import { SortEvent } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }
  private store: Store = inject(Store);
    readonly router: Router = inject(Router);

    loading$: Signal<boolean> = this.store.selectSignal(
      PatientsFeature.selectLoading
    );
    Patients$: Signal<Patient[] | null> = this.store.selectSignal(
      PatientsFeature.selectPatients
    );
    FilteredPatients$: Signal<Patient[] | null> = this.store.selectSignal(
      PatientsFeature.selectFilteredPatients
    );
    PatientsState$: Signal<PatientsState | null> = this.store.selectSignal(
      PatientsFeature.selectPatientState
    );
    SearchTerm$: Signal<any> = this.store.selectSignal(
      PatientsFeature.selectSearch
    );

    error$: Signal<string | null> = this.store.selectSignal(
      PatientsFeature.selectError
    );
    SelectedPatientId$: Signal<number> = this.store.selectSignal(
      PatientsFeature.selectSelectedPatientId);
    SelectedPatient$: Signal<Patient> = this.store.selectSignal(
      PatientsFeature.selectSelectedPatient);


    initializePatients(): void {
      this.store.dispatch(actions.loadPatients());
    }

    // crud

    addPatient(Patient:Patient): void {
      this.store.dispatch(actions.createPatient({ Patient }));
    }

    updatePatient(Patient:Patient) {
      this.store.dispatch(actions.updatePatient({ Patient}));
      console.log('update patient from service id:',Patient.id)
    }

    deletePatient(PatientId: number) {
      this.store.dispatch(actions.removePatients({PatientId}));
      console.log('delete patient from service id:',PatientId)
    }
    viewProfile(PatientId: number) {
      this.store.dispatch(actions.loadProfiles({PatientId}))
      console.log('load profile from service id:',PatientId)
    }
    searchCategory(query: string) {
        this.store.dispatch(actions.searchPatients({query}));
      }
      onSort(event: SortEvent) {
        event.data=[];
      this.store.dispatch(actions.sortPatients({
        field: event.field,
        order: event.order
      }));
    }

}
