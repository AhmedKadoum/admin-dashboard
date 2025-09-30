import { Medication } from '../../store/slices/medications/medication.store';
import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { MedicationService } from '../../../services/medication/medication.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { SearchInputComponent } from "../../shared/search-input/search-input.component";


@Component({
  selector: 'app-Medications',
  imports: [CommonModule, TableModule, ButtonModule, BreadcrumbModule,
    DialogModule, ConfirmDialogModule,
    ReactiveFormsModule, FormsModule, ConfirmPopupModule, DataViewModule, SearchInputComponent],
  templateUrl: './Medications.component.html',
  styleUrl: './Medications.component.css',
  standalone:true,
})
export class MedicationsComponent implements OnInit {
  private MedicationServices: MedicationService = inject(MedicationService);
MedicationForm!: FormGroup;
searchForm!: FormGroup;
fb=inject(FormBuilder);
 private confirmationService: ConfirmationService = inject(ConfirmationService);
dialogueVisible:boolean=false;
  // signal
  loading: Signal<boolean> = this.MedicationServices.loading$;
  readonly Medications: Signal<Medication[] | null> = this.MedicationServices.Medications$;
  error: Signal<string | null> = this.MedicationServices.error$;
  // breadCrumb
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [{ label: 'Dashboard', routerLink: '/dashboard' },
     { label: 'Medications' }];


  //
  ngOnInit(): void {

      this.MedicationServices.initializeMedications();
      this.MedicationForm=this.fb.group({
        id:[0],
        name:[''],
      })
  }
  // add & edit dialogue
  addMedication() {
    this.dialogueVisible=true;
    this.MedicationForm.reset({id:0,name:''});
  }

   editMedication(Medication: Medication) {
    console.log('Medication is ',Medication);
    // const updated = { ...Medication, name: Medication.Name + ' (Updated)', id: 5 };
  this.MedicationForm.patchValue(Medication);  // fill form
  this.dialogueVisible= true;
  }
saveMedication() {
  const Medication: Medication = this.MedicationForm.value;
  console.log('save Medication',Medication)
  if (Medication.id && Medication.id > 0) {
    this.MedicationServices.updateMedication( Medication.id, Medication.name);//check xxxx
  } else {
    this.MedicationServices.addMedication( Medication.name);
    console.log('add new Medication',Medication.name)
  }
  this.dialogueVisible = false;
}
  // confirm delete
  confirm(id:number){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Medication?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept:()=>{
        this.MedicationServices.deleteMedication(id);
        console.log('deleted id from confirm',id);
        this.confirmationService.close();
      },
      reject:()=>{
        console.log('rejected')
        this.confirmationService.close();
      }
    })
  }
  onSort(event: any) {
    this.MedicationServices.onSort(event);
  }

}
