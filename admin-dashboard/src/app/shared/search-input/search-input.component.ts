import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CategoryService } from '../../../services/category/categoryService';
import { MedicationService } from '../../../services/medication/medication.service';
import { PatientService } from '../../../services/patient/patient.service';
@Component({
  selector: 'app-search-input',
  imports: [ ReactiveFormsModule,FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
   standalone: true,
})
export class SearchInputComponent implements OnInit {
searchForm!: FormGroup;
fb=inject(FormBuilder);
private MedicationServices: MedicationService = inject(MedicationService);
MedicationForm!: FormGroup;
 private categoryServices: CategoryService = inject(CategoryService);
 private PatientServices: PatientService = inject(PatientService);
 ngOnInit(): void {
      this.searchForm=this.fb.group({
        search:['']
      })
      this.searchForm.get('search')?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe((value:String)=>{
        console.log('search value is ',value) ;
        this.categoryServices.searchCategory(value.toString());
        this.MedicationServices.searchMedication(value.toString());
        this.PatientServices.searchPatient(value.toString());
      }
      )
  }
}
