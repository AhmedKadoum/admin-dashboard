// src/app/core/services/test.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, tap, delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private http: HttpClient = inject(HttpClient);


  constructor() {}

  getUser(): Observable<any> {
    console.log('Fetching user data...');

    // Simulate network delay for better visibility in devtools
    return this.http.get<any>('users').pipe(
      delay(1000), // 1 second delay to see request in network tab
      tap((response) => console.log('User fetched:', response)),
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`users/${id}`).pipe(
      delay(1000),
      tap(user => console.log('User by ID fetched:', user)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP Error:', error);

    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
