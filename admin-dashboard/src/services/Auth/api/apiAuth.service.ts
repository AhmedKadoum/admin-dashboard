import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthState } from '../../../app/store/slices/auth/auth.store';

@Injectable({
  providedIn: 'root',
})
export class apiAuthService {
  private http: HttpClient = inject(HttpClient);

  fetchUserData(username: string, password: string): Observable<AuthState> {
    // Replace '/api/user' with the actual endpoint for fetching user data
    return this.http.get<AuthState>('/api/users').pipe(
      map((response: AuthState) => {
        return response;
      })
    );
  }
  // test
  // login(username: string, password: string): Observable<AuthState> {
  //   return this.http.get<any[]>('http://localhost:3000/users').pipe(
  //     map((users) => {
  //       const user = users.find(
  //         (u) => u.username === username && u.password === password
  //       );
  //       if (user) {
  //         localStorage.setItem('user', JSON.stringify(user));
  //       }
  //       return user;
  //     })
  //   );
  // }
}
