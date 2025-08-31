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
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-Patients',
  imports: [CommonModule,FormsModule,SelectButtonModule,TableModule,DialogModule, ButtonModule, BreadcrumbModule, ProfileDetailsComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
  standalone:true,
})
export class PatientsComponent implements OnInit {

   private PatientServices: PatientService = inject(PatientService);

  // signal
  loading: Signal<boolean> = this.PatientServices.loading$;
  Patients: Signal<Patient[] | null> = this.PatientServices.Patients$;
  error: Signal<string | null> = this.PatientServices.error$;
  // breadCrumb
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [{ label: 'Dashboard', routerLink: '/dashboard' }, { label: 'Patients' }];
dialogVisible: boolean=false;
// medication:boolean=true;
// consultation:boolean=false;
stateOptions = [
  { label: 'Medication', value: 'medication' },
  { label: 'Consultation', value: 'consultation' }
];
value:string="medication";
  //
  ngOnInit(): void {
      this.PatientServices.initializePatients()
      console.log('Patient from component')
  }
  constructor() {
    effect(() => {
      console.log(this.Patients())
    });
  }
  // CRUD actions
  addPatient() {
    this.PatientServices.addPatient('new Patient');
  }

  editPatient(Patient: Patient) {
    const updated = { ...Patient, name: Patient.Name + ' (Updated)', id: 5 };
    this.PatientServices.updatePatient(updated.id, updated.name);
  }

  deletePatient(id: number) {
    this.PatientServices.deletePatient(id);
  }
  viewProfile(id: number) {
    // this.PatientServices.viewProfile(id);
    this.dialogVisible=true;
  }
  // local data for test
localPatients:Patient[]=[
  {
    id: 1,
    Name: 'John Doe',
    image: 'assets/images/patient1.png',
    themeColor: '#4CAF50',
    connectedUserNumber: 2,
    dateOfBirth: new Date('1990-05-15'),
    gender: 'Male',
    currentPatients: [
      {
        PatientId: 1,
        PatientName: 'John Doe',
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
    Name: 'Jane Smith',
    image: 'assets/images/patient2.png',
    themeColor: '#FF9800',
    connectedUserNumber: 1,
    dateOfBirth: new Date('1985-11-23'),
    gender: 'Female',
    currentPatients: [
      {
        PatientId: 2,
        PatientName: 'Jane Smith',
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
