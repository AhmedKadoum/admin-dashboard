
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

    loadPatientsData(): Observable<any> {
      console.log('API service called to load patients');
  return this.http.get<any>('/api/patients').pipe(
    tap((response )=>console.log('raw response from api service is ', response.data)),
    map((response:any) => {
      return response.data;
    })
  );
}
    loadPatientsDataById(id:number): Observable<any> {
      console.log('API service called to load patients',id);
  return this.http.get<any>(`/api/patients/${id}`).pipe(
    tap((response )=>console.log('raw response from api service is ', response.data)),
    map((response:any) => {
      return response.data;
    })
  );
}
    // searchPatients(query:string): Observable<Patient[]> {
    //    console.log('API called with query:', query);
    //   return this.http.get<Patient[]>('Patients').pipe(
    //     map((response: Patient[]) => {
    //       console.log('response is ',response)
    //       return response;
    //     })
    //   );
    // }

}
