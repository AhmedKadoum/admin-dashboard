import { Patient } from '../../store/slices/patients/patient.store';
import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { PatientService } from '../../../services/patient/patient.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
// import { ProfileDetailsComponent } from "./profile-details/profile-details.component";
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';


@Component({
  selector: 'app-Patients',
  imports: [CommonModule,FormsModule,SelectButtonModule,ReactiveFormsModule,
    TableModule,DialogModule, ButtonModule, BreadcrumbModule,
    ConfirmDialogModule,ToastModule,ConfirmPopupModule
     ,IconFieldModule,InputIconModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
  standalone:true,
})
export class PatientsComponent implements OnInit {

  private PatientServices: PatientService = inject(PatientService);
  private confirmationService: ConfirmationService = inject(ConfirmationService);
  fb = inject(FormBuilder);
  store = inject(Store);
  searchForm!: FormGroup;
  patientForm!: FormGroup;

  // signal
  loading: Signal<boolean> = this.PatientServices.loading$;
  Patients: Signal<Patient[] | null> = this.PatientServices.Patients$;
  FilteredPatients: Signal<Patient[] | null> = this.PatientServices.FilteredPatients$;
  error: Signal<string | null> = this.PatientServices.error$;
  selectedPatient:Signal<Patient|null>= this.PatientServices.SelectedPatient$

  // breadCrumb
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [{ label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Patients' }];


  dialogVisible: boolean=false;
  EditDialogVisible: boolean=false;
// medication& consultation state
stateOptions = [
  { label: 'Medication', value: 'medication' },
  { label: 'Consultation', value: 'consultation' }
];
value:string='medication'//default
  // form

  ngOnInit(): void {

  // initialize patients

      this.PatientServices.initializePatients();
      console.log('Patient from api in  component',this.Patients());
       this.patientForm = this.fb.group({
       id: [0],
       Name: [''],
       themeColor: ['#4CAF50'],
       dateOfBirth: [new Date()],
       gender: ['Male']
       });
      // build search form///need check?xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      this.searchForm=this.fb.group({
        search:['']
      })
       this.searchForm.get('search')?.valueChanges
      .pipe(
        debounceTime(400),  // wait user typing
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        this.PatientServices.searchCategory(value.toString());
      });
  }
  //
  constructor() {
    // effect(() => {
    //   console.log(this.Patients())
    // });
  }
  // CRUD actions
  addPatient() {
    this.EditDialogVisible=true;
    this.patientForm.reset({id:0,name:'',image: "./../../../assets/images/patients/ee.webp"
      ,themeColor:'#4CAF50',dateOfBirth:new Date()})
}
// Save changes
editPatient(Patient: Patient) {
  console.log('patient is ',Patient);
  // const updated = { ...Patient, name: Patient.Name + ' (Updated)', id: 5 };
  // this.PatientServices.updatePatient(Patient)

this.patientForm.patchValue(Patient);  // fill form
this.EditDialogVisible = true;
}
savePatient() {
  const patient: Patient = this.patientForm.value;
console.log('save patient',patient)
  if (patient.id && patient.id > 0) {
    this.PatientServices.updatePatient(patient);
  } else {
    this.PatientServices.addPatient( patient);
    console.log('add new patient',patient.name)
  }

  this.EditDialogVisible = false;
  console.log(patient)
}
  //confirm
 confirm(id:number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.PatientServices.deletePatient(id);
        console.log('Deleted! id is : ',id);
        this.confirmationService.close();
      },
      reject: () => {
        console.log('Rejected!');
        this.confirmationService.close();
      },
    });

  }

  //  =>>>>not use now check


  //





  //
  //  selectedProfile: Patient | null = null;

  viewProfile(id: number) {
    this.PatientServices.viewProfile(id);
    console.log('view profile',id)
    this.dialogVisible=true;
    // for local only
  //  this.selectedProfile = this.localPatients.find(p => p.id === id) || null;

  }
  //  onSearch(data: any) {
  //   data=this.fb.control(this.searchForm)
  //   this.PatientServices.onSearch(this.value)
  //   console.log(data)
  // }
  // local data for test
localPatients:Patient[]=[
  {
    id: 1,
    name: 'ahmed kadoum',
    image: 'assets/images/patients/aa.webp',
    themeColor: '#4CAF50',
    connectedUserNumber: 2,
    dateOfBirth: new Date('1990-05-15'),
    gender: 'Male',
    currentPatients: [
      {
        MedId: 1,
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
    currentConsultations: [
      {id:1,name:'Cardiology Checkup',
      StartDate:new Date('2025-06-15'),EndDate:new Date('2025-06-30')},
       {id:2,name:'Blood Pressure Monitoring',
         StartDate:new Date('2025-06-15'),EndDate:new Date('2025-06-30')},
       ],
  },
  {
    id: 2,
    name: 'linda Ahmed',
    image: 'assets/images/patients/bb.webp',
    themeColor: '#FF9800',
    connectedUserNumber: 1,
    dateOfBirth: new Date('1985-11-23'),
    gender: 'Female',
    currentPatients: [
      {
       MedId: 2,
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
