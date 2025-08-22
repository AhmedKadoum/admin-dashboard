// src/app/core/services/test.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, tap, delay } from 'rxjs';
import { User } from '../mock-api/mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'api/users'; // Note: 'api/' prefix for in-memory web API

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    console.log('Fetching user data...');

    // Simulate network delay for better visibility in devtools
    return this.http.get<User>(this.apiUrl).pipe(
      delay(1000), // 1 second delay to see request in network tab
      tap(user => console.log('User fetched:', user)),
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
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
