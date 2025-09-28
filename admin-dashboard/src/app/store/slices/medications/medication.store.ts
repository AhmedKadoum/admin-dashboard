import {
  createReducer,
  on,
  createAction,
  props,
  createFeature,
} from '@ngrx/store';

// model
export interface Medication {
  id: number;
  name: string;
  image?: string;
  barCode?: string;
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
  createMedicationSuccess: createAction(
    '[Medications] Create Medications Success',
    props<{ name: string }>()
  ),
  createMedicationFailure: createAction(
    '[Medications] Create Medications Failure',
    props<{ error: string }>()
  ),

  updateMedication: createAction(
    '[Medications] Update Medications',
    props<{ MedicationId: number; name: string }>()
  ),
  updateMedicationSuccess: createAction(
    '[Medications] Update Medications success',
    props<{ MedicationId: number; name: string }>()
  ),
  updateMedicationFailure: createAction(
    '[Medications] Update Medications Failure',
    props<{ error: string }>()
  ),
    SearchMedication: createAction(
    '[Medications] Search Medications',
    props<{ query: string }>()
  ),
  sortMedications: createAction(
    '[Medications] Sort Medications',
    props<{ field: any; order: any }>()
  ),
};
export const featureKey = 'Medication';

// Define the initial state for authentication
export interface MedicationsState {
  Medications: Medication[];
  filteredMedications: Medication[];
  search: string|null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  selectedMedicationId: number;
  selectedMedication: Medication|null;
}

export const initialState: MedicationsState = {
  Medications: [],
  filteredMedications:[],
  search: '',
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  selectedMedicationId: 0,
  selectedMedication: null,
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
      error:error,
      loading: false,
    })
  ),
  on(actions.loadMedicationsSuccess, (state, { data }) => ({
    ...state,
    Medications: data,
    filteredMedications:data,
    loading: false,
  })),
   on(actions.createMedicationSuccess, (state, {name }) => {
     const maxId = state.Medications.length? Math.max(...state.Medications.map(c=>c.id)):0;
     const newMedication = { id: maxId + 1, name: name.concat(`${maxId+1}`)};
     return({
       ...state,
       filteredMedications:[...state.Medications,(newMedication)],
       loading: false,
     })
   }),
    on( actions.removeMedicationsSuccess,(state, {MedicationsId}) => ({
        ...state,
        filteredMedications:[...state.Medications.filter(c=>c.id !== MedicationsId)],
        selectedMedicationId:state.selectedMedicationId===MedicationsId?0:state.selectedMedicationId,
        loading: false,
    })),
   on(actions.sortMedications, (state, { field, order }) => {
      const sorted = [...state.filteredMedications].sort((a, b) => {
      const valA = (a as any)[field];
      const valB = (b as any)[field];

      if (valA < valB) return -1 * order;
      if (valA > valB) return 1 * order;
      return 0;
    });
    // to prevent infinite loop return new array if false only
  const isSame =
    JSON.stringify(sorted) === JSON.stringify(state.filteredMedications);

  if (isSame) return state;
    return {
      ...state,
      filteredMedications: sorted
    };
  })
  ,
    on( actions.SearchMedication,(state, {query}) => {
       const filtered = !query || query.trim() === ''
      ? [...state.Medications] // if query is empty, return full list
      : [...state.Medications.filter(c =>
          c.name.toLowerCase().includes(query.toLowerCase())
        )];
      return{
        ...state,
         filteredMedications:filtered,
        loading: false,
    }}),
    on(
      actions.updateMedicationSuccess,
      (state,{MedicationId,name}) => {
        const updatedMedication=state.Medications.find(c=>c.id===MedicationId);
       const updatedMedications = state.Medications.map(c =>
        c.id === MedicationId ? { ...c, name } : c
      );
        if(!updatedMedication){
          return state;
        }else{

          return({
            ...state,
            filteredMedications:updatedMedications,
             selectedMedication: { id: MedicationId, name },
            selectedMedicationId:MedicationId,
            loading: false,
            error: null,
          })
        }
      }
    )
);

export const MedicationsFeature = createFeature({
  name: featureKey,
  reducer,
});
