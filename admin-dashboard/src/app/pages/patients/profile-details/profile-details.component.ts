import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile-details',
  imports: [DialogModule,TableModule,ButtonModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {
  dialogVisible:boolean=false;
showDialog(){
this.dialogVisible=true;
console.log('show profiles details')
}
currentPatients= [
      {
        PatientId: 1,
        PatientName: 'John Doe',
        PatientCategory: 'Cardiology',
        dosage: '10mg',
        quantity: 30,
        startDate: new Date('2025-08-01'),
        endDate: new Date('2025-08-30'),
        frequency: 'Once daily',
        status: 'token',
        notes: 'Take after meals',
      },
      {
        PatientId: 2,
        PatientName: 'John aaa',
        PatientCategory: 'Cardiology',
        dosage: '10mg',
        quantity: 30,
        startDate: new Date('2025-08-01'),
        endDate: new Date('2025-08-30'),
        frequency: 'Once daily',
        status: 'token',
        notes: 'Take after meals',
      },
    ];
    currentConsultations= ['Cardiology Checkup', 'Blood Pressure Monitoring']
  }

