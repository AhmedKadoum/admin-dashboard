
import {
  MedicationsFeature,
  MedicationsState,
  Medication,
} from './../../app/store/slices/medications/medication.store';
import { computed, inject, Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { actions } from '../../app/store/slices/medications/medication.store';
import { SortEvent } from 'primeng/api';

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
      MedicationsFeature.selectFilteredMedications
    );
    Medications_Total$: Signal<number | null> =computed(()=>
    this.Medications$()?.length??0);
    MedicationsState$: Signal<MedicationsState | null> = this.store.selectSignal(
      MedicationsFeature.selectMedicationState
    );

    error$: Signal<string | null> = this.store.selectSignal(
      MedicationsFeature.selectError
    );
      SelectedMedicationId$: Signal<number> = this.store.selectSignal(
        MedicationsFeature.selectSelectedMedicationId);
    initializeMedications(): void {
      this.store.dispatch(actions.loadMedications());
    }
    // crud

    addMedication(MedicationName: string): void {
      this.store.dispatch(actions.createMedication({ name:MedicationName }));
    }

    updateMedication(MedicationId: number, MedicationName: string) {
      this.store.dispatch(actions.updateMedication({ MedicationId, name:MedicationName }));
    }

    deleteMedication(MedicationsId: number) {
      this.store.dispatch(actions.removeMedications({ MedicationsId:MedicationsId }));
    }
      searchMedication(query: string) {
        this.store.dispatch(actions.SearchMedication({query}));
      }
      onSort(event: SortEvent) {
        //prevent dispatch for missing field
         if (!event.field||!event.order) return;
      this.store.dispatch(actions.sortMedications({
        field: event.field,
        order: event.order??1
      }));
    }
}
