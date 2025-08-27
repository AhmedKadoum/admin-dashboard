import { Medication } from '../../store/slices/medications/medication.store';
import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { MedicationService } from '../../../services/medication/medication.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-Medications',
  imports: [CommonModule,TableModule,ButtonModule,BreadcrumbModule],
  templateUrl: './Medications.component.html',
  styleUrl: './Medications.component.css',
  standalone:true,
})
export class MedicationsComponent implements OnInit {

   private MedicationServices: MedicationService = inject(MedicationService);

  // signal
  loading: Signal<boolean> = this.MedicationServices.loading$;
  Medications: Signal<Medication[] | null> = this.MedicationServices.Medications$;
  error: Signal<string | null> = this.MedicationServices.error$;
  // breadCrumb
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [{ label: 'Dashboard', routerLink: '/dashboard' }, { label: 'Medications' }];
  //
  ngOnInit(): void {
      this.MedicationServices.initializeMedications()
      console.log('Medication from component')
  }
  constructor() {
    effect(() => {
      console.log(this.Medications())
    });
  }
  // CRUD actions
  addMedication() {
    this.MedicationServices.addMedication('new Medication');
  }

  editMedication(Medication: Medication) {
    const updated = { ...Medication, name: Medication.name + ' (Updated)', id: 5 };
    this.MedicationServices.updateMedication(updated.id, updated.name);
  }

  deleteMedication(id: number) {
    this.MedicationServices.deleteMedication(id);
  }
  // local data for test
   localMedications:Medication[]=[
  {
    "id": "1",
    "name": "Paracetamol",
    "image": "assets/images/medications/paracetamol.jpg",
    "barCode": "1234567890123"
  },
  {
    "id": "2",
    "name": "Amoxicillin",
    "image": "assets/images/medications/amoxicillin.png",
    "barCode": "2234567890123"
  },
  {
    "id": "3",
    "name": "Ibuprofen",
    "image": "assets/images/medications/ibuprofen.png",
    "barCode": "3234567890123"
  },
  {
    "id": "4",
    "name": "Cough Syrup",
    "image": "assets/images/medications/cough-syrup.png",
    "barCode": "4234567890123"
  }
]
}
