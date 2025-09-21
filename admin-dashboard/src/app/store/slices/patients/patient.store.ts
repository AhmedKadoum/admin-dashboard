import {
  createReducer,
  on,
  createAction,
  props,
  createFeature,
} from '@ngrx/store';

// model
export interface Patient {
  id: number;
  name: string;
  image?: string;
  themeColor: string;
  connectedUserNumber?: number;
  dateOfBirth: Date;
  gender?: 'Male' | 'Female';
  currentPatients?: PatientMedication[];
  currentConsultations?: object[];
}

export interface PatientMedication {
  MedId: number;
  MedicationName:string;
  PatientCategory: string;
  dosage: string;
  quantity: number;
  startDate: Date;
  endDate: Date;
  frequency: string;
  status: 'token' | 'missed' | 'skipped' ;
  notes?: string;
}

// Define actions for Patient
export const actions = {
  loadPatients: createAction('[Patients] Load Patients'),
  loadPatientsSuccess: createAction(
    '[Patients] Load Patients Success',
    props<{ data: Patient[] }>()
  ),
  loadPatientsFailure: createAction(
    '[Patients] Load Patients Failure',
    props<{ error: string }>()
  ),
  removePatients: createAction(
    '[Patients] Remove Patients',
    props<{ PatientId: number }>()
  ),
  removePatientsSuccess: createAction(
    '[Patients] Remove Patients Success',
    props<{ PatientsId: number }>()
  ),
  removePatientsFailure: createAction(
    '[Patients] Remove Patients Failure',
    props<{ error: string }>()
  ),

  createPatient: createAction(
    '[Patients] Create Patients',
    props<{  Patient:Patient }>()
  ),
  createPatientSuccess: createAction(
    '[Patients] Create Patients Success',
  props<{  Patient:Patient }>()
),
  createPatientFailure: createAction(
    '[Patients] Create Patients Failure',
    props<{ error: string }>()
  ),

  updatePatient: createAction(
    '[Patients] Update Patients',
    props<{ Patient:Patient }>()
  ),
  updatePatientSuccess: createAction(
    '[Patients] Update Patients Success',
     props<{ Patient:Patient }>()
  ),
  updatePatientFailure: createAction(
    '[Patients] Update Patients Failure',
    props<{ error: string }>()
  ),
  loadProfiles: createAction(
    '[Profiles] Load Profiles Success',
    props<{PatientId: number}>()
  ),
  loadProfilesSuccess: createAction(
    '[Profiles] Load Profiles Success',
    props<{data: any}>()
  ),
  loadProfilesFailure: createAction(
    '[Profiles] Load Profiles Failure',
    props<{ error: string }>()
  ),
  searchPatients : createAction(
  '[Patient] Search',
  props<{ query: string }>()
)
  ,
//   searchPatientsSuccess : createAction(
//   '[Patient] Search',
//   props<{ patients: Patient[] }>()
// )
//   ,
//   searchPatientsFailure : createAction(
//   '[Patient] Search',
//   props<{ error: string }>()
// ),
 selectPatient: createAction(
    '[Patients] Select Patient',
    props<{ patient: Patient | null }>()
  ),
    SearchPatients: createAction(
    '[Patients] Search Patients',
    props<{ query: string }>()
  ),
  sortPatients: createAction(
    '[Patients] Sort Patients',
    props<{ field: any; order: any }>()
  ),
};
export const featureKey = 'Patient';


export interface PatientsState {
  Patients: Patient[];
  filteredPatients: Patient[];
  search: string|null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  selectedPatientId: number;
  selectedPatient: Patient;

}

export const initialState: PatientsState = {
  Patients: [],
  filteredPatients:[],
  search: '',
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  selectedPatientId: 0,
  selectedPatient: {} as Patient,
};
export interface ProfileResponse {
  currentPatients: PatientMedication[];
  currentConsultations: object[];
}
// export interface ProfilesState {
//   currentPatients: PatientMedication[];
//   currentConsultations: object[];
//   loading: boolean;
//   error?: string | null;
// }

export const reducer = createReducer(
  initialState,
  on(
    actions.loadPatients,
    actions.createPatient,
    actions.updatePatient,
    actions.removePatients,
    actions.loadProfiles,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    actions.loadPatientsFailure,
    actions.createPatientFailure,
    actions.updatePatientFailure,
    actions.removePatientsFailure,
    actions.loadProfilesFailure,
    (state, { error }) => ({
      ...state,
      error:error,
      loading: false,
    })
  ),
  on(actions.loadPatientsSuccess, (state, { data }) => ({
    ...state,
    Patients: data,
    filteredPatients: data,
    loading: false,
  })),

  on(actions.loadProfilesSuccess, (state, { data }) => ({
    ...state,
    selectedPatient:data,
    // currentPatients:(state.filteredPatients.find(c=>c.id===PatientId))?.currentPatients,
    // currentConsultations:(state.filteredPatients.find(c=>c.id===PatientId))?.currentConsultations,
    loading: false,
  })),

    on(actions.createPatientSuccess, (state, { Patient }) => {
      const maxId = state.filteredPatients.length? Math.max(...state.filteredPatients.map(c => c.id)): 0;
      // const newPatient = { id: maxId + 1, name: name.concat(`${maxId+1}`)};
      const newPatient = { ...Patient,id: maxId + 1}
      return({
        ...state,
        filteredPatients:[...state.filteredPatients,(newPatient)],
        loading: false,
      })
    }),
    on( actions.removePatientsSuccess,(state, {PatientsId}) => ({
        ...state,
        filteredPatients:[...state.filteredPatients.filter(c=>c.id !== PatientsId)],
        loading: false,
    })),
  on(actions.updatePatientSuccess, (state, { Patient }) => {
  // find if the patient exists in the current list
  const exists = state.filteredPatients.some(c => c.id === Patient.id);
  if (!exists) {
    return state;
  }
  const updatedPatients = state.filteredPatients.map(c =>
    c.id === Patient.id ? { ...c, ...Patient } : c
  );
  const updatedItem = updatedPatients.find(c => c.id === Patient.id)!;
  return {
    ...state,
    filteredPatients: updatedPatients,
    selectedPatient: updatedItem,
    selectedPatientId: updatedItem.id,
    loading: false,
    error: null,
  };
}),
  on( actions.SearchPatients,(state, {query}) => {
      const filtered = !query || query.trim() === ''
     ? [...state.Patients]
     : [...state.Patients.filter(c =>
         c.name.toLowerCase().includes(query.toLowerCase())
       )];
     return{
       ...state,
        filteredPatients:filtered,
       loading: false,
   }}),
  on(actions.selectPatient, (state, { patient }) => ({
    ...state,
    selectedPatient: patient || ({} as Patient),
    selectedPatientId: patient ? patient.id : 0
  })
));

export const PatientsFeature = createFeature({
  name: featureKey,
  reducer,
});
