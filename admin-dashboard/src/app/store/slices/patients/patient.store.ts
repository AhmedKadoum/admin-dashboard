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
  Name: string;
  image?: string;// Optional field for patient's profile picture URL
  themeColor: string;
  connectedUserNumber?: number;// Optional field to indicate the number of connected users
  dateOfBirth: Date;
  gender: 'Male' | 'Female';
  currentPatients: PatientMedication[];
  currentConsultations: object[]; // Array of consultation
}

export interface PatientMedication {
  PatientId: number;
  PatientName: string;
  MedicationName:string;
  PatientCategory: string;
  dosage: string;
  quantity: number;
  startDate: Date;
  endDate: Date;
  frequency: string;
  status: 'token' | 'missed' | 'skipped' ;
  notes?: string; // Optional field for additional notes
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
    props<{ name: string }>()
  ),
  createPatientSuccess: createAction('[Patients] Create Patients Success'),
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
    props<{data:ProfileResponse}>()
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
  searchPatientsSuccess : createAction(
  '[Patient] Search',
  props<{ patients: Patient[] }>()
)
  ,
  searchPatientsFailure : createAction(
  '[Patient] Search',
  props<{ error: string }>()
),
 selectPatient: createAction(
    '[Patients] Select Patient',
    props<{ patient: Patient | null }>()
  )
};
export const featureKey = 'Patient';

// Define the initial state for authentication
export interface PatientsState {
  Patients: Patient[];
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
// Create a reducer to handle authentication actions
export const reducer = createReducer(
  initialState,
  on(
    actions.loadPatients,
    actions.createPatient,
    actions.updatePatient,
    actions.removePatients,
    actions.loadProfiles,
    actions.searchPatients,
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
    actions.searchPatientsFailure,
    (state, { error }) => ({
      ...state,
      error:error,
      loading: false,
    })
  ),
  on(actions.loadPatientsSuccess, (state, { data }) => ({
    ...state,
    Patients: data,
    loading: false,
  })),

  on(actions.loadProfilesSuccess, (state, { data }) => ({
    ...state,
    currentPatients:data.currentPatients,
    currentConsultations:data.currentConsultations,
    loading: false,
  })),

  on(
    actions.createPatientSuccess,
    actions.removePatientsSuccess,
    (state) => ({
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(
    actions.updatePatientSuccess,
    (state,{Patient})=>({
      ...state,
      loading:false,

Patients:[...state.Patients,Patient]
    })
  ),
  on(
    actions.searchPatientsSuccess,
    (state,{patients})=>({
      ...state,
      loading:false,
patients
    })
  ),
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
