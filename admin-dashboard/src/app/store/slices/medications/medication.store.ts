import {
  createReducer,
  on,
  createAction,
  props,
  createFeature,
} from '@ngrx/store';

// model
export interface Medication {
  id: string;
  name: string;
  image: string;
  barCode: string;
}

// Define actions for Medication
export const actions = {
  loadMedications: createAction('[Medications] Load Medications'),
  loadMedicationsSuccess: createAction(
    '[Medications] Load Medications Success',
    props<{ data: Medication[] }>()
  ),
  loadMedicationsFailure: createAction(
    '[Medications] Load Medications Failure',
    props<{ error: string }>()
  ),
  removeMedications: createAction(
    '[Medications] Remove Medications',
    props<{ MedicationsId: number }>()
  ),
  removeMedicationsSuccess: createAction(
    '[Medications] Remove Medications Success',
    props<{ MedicationsId: number }>()
  ),
  removeMedicationsFailure: createAction(
    '[Medications] Remove Medications Failure',
    props<{ error: string }>()
  ),

  createMedication: createAction(
    '[Medications] Create Medications',
    props<{ name: string }>()
  ),
  createMedicationSuccess: createAction('[Medications] Create Medications Success'),
  createMedicationFailure: createAction(
    '[Medications] Create Medications Failure',
    props<{ error: string }>()
  ),

  updateMedication: createAction(
    '[Medications] Update Medications',
    props<{ MedicationId: number; name: string }>()
  ),
  updateMedicationSuccess: createAction('[Medications] Update Medications Success'),
  updateMedicationFailure: createAction(
    '[Medications] Update Medications Failure',
    props<{ error: string }>()
  ),
};
export const featureKey = 'Medication';

// Define the initial state for authentication
export interface MedicationsState {
  Medications: Medication[];
  search: string;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  selectedMedicationId: number;
  selectedMedication: Medication;
}

export const initialState: MedicationsState = {
  Medications: [],
  search: '',
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  selectedMedicationId: 0,
  selectedMedication: {} as Medication,
};
// Create a reducer to handle authentication actions
export const reducer = createReducer(
  initialState,
  on(
    actions.loadMedications,
    actions.createMedication,
    actions.updateMedication,
    actions.removeMedications,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    actions.loadMedicationsFailure,
    actions.createMedicationFailure,
    actions.updateMedicationFailure,
    actions.removeMedicationsFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  ),
  on(actions.loadMedicationsSuccess, (state, { data }) => ({
    ...state,
    Medications: data,
    loading: false,
  })),
  on(
    actions.createMedicationSuccess,
    actions.updateMedicationSuccess,
    actions.removeMedicationsSuccess,
    (state) => ({
      ...state,
      loading: false,
      error: null,
    })
  )
);

export const MedicationsFeature = createFeature({
  name: featureKey,
  reducer,
});
