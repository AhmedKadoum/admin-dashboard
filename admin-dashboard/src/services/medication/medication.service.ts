
import {
  MedicationsFeature,
  MedicationsState,
  Medication,
} from './../../app/store/slices/medications/medication.store';
import { inject, Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { actions } from '../../app/store/slices/medications/medication.store';


@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor() { }
  private store: Store = inject(Store);
    readonly router: Router = inject(Router);

    loading$: Signal<boolean> = this.store.selectSignal(
      MedicationsFeature.selectLoading
    );
    Medications$: Signal<Medication[] | null> = this.store.selectSignal(
      MedicationsFeature.selectMedications
    );
    MedicationsState$: Signal<MedicationsState | null> = this.store.selectSignal(
      MedicationsFeature.selectMedicationState
    );

    error$: Signal<string | null> = this.store.selectSignal(
      MedicationsFeature.selectError
    );

    initializeMedications(): void {
      this.store.dispatch(actions.loadMedications());
    }
    // crud

    addMedication(name: string): void {
      this.store.dispatch(actions.createMedication({ name }));
    }

    updateMedication(MedicationId: number, name: string) {
      this.store.dispatch(actions.updateMedication({ MedicationId, name }));
    }

    deleteMedication(MedicationsId: number) {
      this.store.dispatch(actions.removeMedications({ MedicationsId }));
    }
}
