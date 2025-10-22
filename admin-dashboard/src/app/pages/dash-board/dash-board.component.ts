import { Component, computed, inject, Signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { MedicationService } from '../../../services/medication/medication.service';
import { Medication } from '../../store/slices/medications/medication.store';
import { CategoryService } from '../../../services/category/categoryService';
import { PatientService } from '../../../services/patient/patient.service';
import { Category } from '../../store/slices/categories/category.store';
import { Patient } from '../../store/slices/patients/patient.store';
@Component({
  selector: 'app-dash-board',
  imports: [ChartModule],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {
  data: any;
  options: any;
  data1: any;
  options1: any;
private MedicationServices:MedicationService=inject(MedicationService);
private CategoryServices:CategoryService=inject(CategoryService);
private PatientServices:PatientService=inject(PatientService);
readonly Medications: Signal<Medication[] | null> = this.MedicationServices.Medications$;
readonly Medications_Total: Signal<number | null> = this.MedicationServices.Medications_Total$;
readonly Categories: Signal<Category[] | null> = this.CategoryServices.categories$;
readonly Categories_Total: Signal<number | null> = this.CategoryServices.Categories_Total$;
readonly Patients: Signal<Patient[] | null> = this.PatientServices.Patients$;
readonly Patients_Total: Signal<number | null> = this.PatientServices.Patients$_Total$;

  constructor() {

    this.data1 = {
      labels: ['Total Medications', 'Total Patients', 'Total categories'],
      datasets: [
        {
          data: [this.Medications_Total(), this.Patients_Total(), this.Categories_Total()],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D']
        }
      ]
    };

    this.options1 = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#495057'
          }
        }
      }
    };
  }
  }


