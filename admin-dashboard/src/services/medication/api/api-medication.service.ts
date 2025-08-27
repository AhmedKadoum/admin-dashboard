
import {
  MedicationsState,
  Medication,
} from '../../../app/store/slices/medications/medication.store';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiMedicationService {

  constructor() { }
  private http: HttpClient = inject(HttpClient);

    loadMedicationsData(): Observable<Medication[]> {
      // Replace '/api/user' with the actual endpoint for fetching user data
      return this.http.get<Medication[]>('http://localhost:3000/Medications').pipe(
        map((response: Medication[]) => {
          console.log('response is ',response)
          return response;
        })
      );
    }
}
