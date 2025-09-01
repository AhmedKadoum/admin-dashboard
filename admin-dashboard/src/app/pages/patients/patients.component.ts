import { Patient } from '../../store/slices/patients/patient.store';
import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { PatientService } from '../../../services/patient/patient.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ProfileDetailsComponent } from "./profile-details/profile-details.component";
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { actions } from '../../store/slices/patients/patient.store';
import { debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-Patients',
  imports: [CommonModule,FormsModule,SelectButtonModule,ReactiveFormsModule,
    TableModule,DialogModule, ButtonModule, BreadcrumbModule,
     ProfileDetailsComponent,IconFieldModule,InputIconModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
  standalone:true,
})
export class PatientsComponent implements OnInit {

   private PatientServices: PatientService = inject(PatientService);
  //   fb = inject(FormBuilder);
  // searchForm!: FormGroup;


  // signal
  loading: Signal<boolean> = this.PatientServices.loading$;
  Patients: Signal<Patient[] | null> = this.PatientServices.Patients$;
  error: Signal<string | null> = this.PatientServices.error$;
  // breadCrumb
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [{ label: 'Dashboard', routerLink: '/dashboard' }, { label: 'Patients' }];
dialogVisible: boolean=false;
EditDialogVisible:boolean=false
// medication:boolean=true;
// consultation:boolean=false;
stateOptions = [
  { label: 'Medication', value: 'medication' },
  { label: 'Consultation', value: 'consultation' }
];
value:string="medication";
value1: any;
  //
   fb = inject(FormBuilder);
  store = inject(Store);
  searchForm!: FormGroup;
  patientForm!: FormGroup;
  ngOnInit(): void {
      this.PatientServices.initializePatients()
      console.log('Patient from component')
      this.searchForm=this.fb.group({
        search:['']
      })
       this.searchForm.get('search')?.valueChanges
      .pipe(
        debounceTime(400),  // wait user typing
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        this.store.dispatch(actions.searchPatients({ query: value }));
      });
        // build empty patient form
  this.patientForm = this.fb.group({
    id: [0],
    Name: [''],
    themeColor: ['#4CAF50'],
    dateOfBirth: [new Date()],
    gender: ['Male']
  });
  }
  constructor() {
    effect(() => {
      console.log(this.Patients())
    });
  }
  // CRUD actions
  addPatient() {
    // this.PatientServices.addPatient('new Patient');
  this.store.dispatch(actions.selectPatient({ patient: null }));
  this.patientForm.reset({
    id: 0,
    Name: '',
    themeColor: '#4CAF50',
    dateOfBirth: new Date(),
    gender: 'Male'
  });
  this.EditDialogVisible = true;
  console.log(this.patientForm.value)
}
// Save changes
savePatient() {
  const patient: Patient = this.patientForm.value;

  if (patient.id && patient.id !== 0) {
    this.store.dispatch(actions.updatePatient({ PatientId: patient.id, name: patient.Name }));
  } else {
    this.store.dispatch(actions.createPatient({ name: patient.Name }));
  }

  this.EditDialogVisible = false;
  console.log(patient)
}

  editPatient(Patient: Patient) {
    // const updated = { ...Patient, name: Patient.Name + ' (Updated)', id: 5 };
    // this.PatientServices.updatePatient(updated.id, updated.name);
    this.store.dispatch(actions.selectPatient({ patient:Patient }));
  this.patientForm.patchValue(Patient);  // fill form
  this.EditDialogVisible = true;
  }


  deletePatient(id: number) {
    this.PatientServices.deletePatient(id);
  }
  viewProfile(id: number) {
    // this.PatientServices.viewProfile(id);
    this.dialogVisible=true;
  }
   onSearch(data: any) {
    data=this.fb.control(this.searchForm)
    this.PatientServices.onSearch(this.value)
    console.log(data)
  }
  // local data for test
localPatients:Patient[]=[
  {
    id: 1,
    Name: 'ahmed kadoum',
    image:'../../../assets/images/patients/profile-2 (1).webp',
    themeColor: '#4CAF50',
    connectedUserNumber: 2,
    dateOfBirth: new Date('1990-05-15'),
    gender: 'Male',
    currentPatients: [
      {
        PatientId: 1,
        PatientName: 'mohamed mohamed',
        MedicationName:'paracetamol',
        PatientCategory: 'Cardiology',
        dosage: '10mg',
        quantity: 30,
        startDate: new Date('2025-08-01'),
        endDate: new Date('2025-08-30'),
        frequency: 'Once daily',
        status: 'token',
        notes: 'Take after meals',
      },
    ],
    currentConsultations: [{id:1,name:'Cardiology Checkup',
      StartDate:new Date('2025-06-15'),EndDate:new Date('2025-06-30')},
       {id:2,name:'Blood Pressure Monitoring',
         StartDate:new Date('2025-06-15'),EndDate:new Date('2025-06-30')},
       ],
  },
  {
    id: 2,
    Name: 'eman Ahmed',
    image: 'assets/images/patient2.png',
    themeColor: '#FF9800',
    connectedUserNumber: 1,
    dateOfBirth: new Date('1985-11-23'),
    gender: 'Female',
    currentPatients: [
      {
        PatientId: 2,
        PatientName:'mahmoud kadoum',
        MedicationName: 'panadol',
        PatientCategory: 'Neurology',
        dosage: '5mg',
        quantity: 60,
        startDate: new Date('2025-08-10'),
        endDate: new Date('2025-09-10'),
        frequency: 'Twice daily',
        status: 'missed',
      },
    ],
    currentConsultations: [{id:1,name:'Neurology Consultation',
       StartDate:new Date('2025-06-15'),EndDate:new Date('2025-06-30')},
    ],
  },
]
}
