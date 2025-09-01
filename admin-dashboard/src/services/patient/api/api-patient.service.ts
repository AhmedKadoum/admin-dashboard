
import {
  PatientsState,
  Patient,
} from '../../../app/store/slices/patients/patient.store';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiPatientService {

  constructor() { }
  private http: HttpClient = inject(HttpClient);

    loadPatientsData(): Observable<Patient[]> {
      // Replace '/api/user' with the actual endpoint for fetching user data
      return this.http.get<Patient[]>('http://localhost:3000/Patients').pipe(
        map((response: Patient[]) => {
          console.log('response is ',response)
          return response;
        })
      );
    }
    searchPatients(query:string): Observable<Patient[]> {
       console.log('API called with query:', query);
      return this.http.get<Patient[]>('http://localhost:3000/Patients').pipe(
        map((response: Patient[]) => {
          console.log('response is ',response)
          return response;
        })
      );
    }

}
