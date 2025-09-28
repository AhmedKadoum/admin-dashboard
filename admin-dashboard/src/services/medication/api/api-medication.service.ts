
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
      return this.http.get<Medication[]>('/api/medications').pipe(
        map((response: any) => {
          console.log('response is ',response)
          return response.data;
        })
      );
    }
}
