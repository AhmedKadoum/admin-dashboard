
import {
  PatientsFeature,
  PatientsState,
  Patient,
} from './../../app/store/slices/patients/patient.store';
import { inject, Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { actions } from '../../app/store/slices/patients/patient.store';


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
    PatientsState$: Signal<PatientsState | null> = this.store.selectSignal(
      PatientsFeature.selectPatientState
    );
    SearchTerm$: Signal<any> = this.store.selectSignal(
      PatientsFeature.selectSearch
    );

    error$: Signal<string | null> = this.store.selectSignal(
      PatientsFeature.selectError
    );

    initializePatients(): void {
      this.store.dispatch(actions.loadPatients());
    }
    initializeTheme(aa:string): void {
      this.store.dispatch(actions.loadTheme());
      console.log('theme initialized from service',aa)
    }
    // crud

    addPatient(name: string): void {
      this.store.dispatch(actions.createPatient({ name }));
    }

    updatePatient(Patient:Patient) {
      this.store.dispatch(actions.updatePatient({ Patient:Patient}));
    }

    deletePatient(PatientId: number) {
      this.store.dispatch(actions.removePatients({PatientId}));
    }
    viewProfile(PatientId: number) {
      this.store.dispatch(actions.loadProfiles({PatientId}))
      console.log('load profile from service id:',PatientId)
    }
    onSearch(query: string) {
      this.store.dispatch(actions.searchPatients({query}))
    }
}
