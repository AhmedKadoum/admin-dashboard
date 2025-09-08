
import {
  PatientsState,
  Patient,
} from '../../../app/store/slices/patients/patient.store';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiPatientService {

  constructor() { }
  private http: HttpClient = inject(HttpClient);

    loadPatientsData(): Observable<Patient[]> {
      console.log('API service called to load patients');
  return this.http.get<{ data: { items: Patient[] } }>('http://localhost:3000/api/theme').pipe(
    tap((response )=>console.log('raw response from api service is ', response.data.items)),
    map((response) => {
      return response.data.items;
    })
  );
}
   fetchTheme(): Observable<any> {
    return this.http
      .get<any>('http://localhost:3000/api/theme')
      .pipe(
      tap(response => {
      console.log('Fetched theme:', response);
    }),
      map((response: any) => response.theme));
  }

    updatePatientsData(): Observable<Patient> {
      // Replace '/api/user' with the actual endpoint for fetching user data
      return this.http.get<Patient>('http://localhost:3000/Patients').pipe(
        map((response: Patient) => {
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
