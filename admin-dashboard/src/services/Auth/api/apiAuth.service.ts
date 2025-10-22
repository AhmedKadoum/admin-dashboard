import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthState } from '../../../app/store/slices/auth/auth.store';

@Injectable({
  providedIn: 'root',
})
export class apiAuthService {
  private http: HttpClient = inject(HttpClient);

  fetchUserData(username: string, password: string): Observable<any> {
    return this.http.post<any>('/api/users', { username, password } ).pipe(
      map((response: any) => {
        const user = response.data.user;
        console.log('API Response qq:', response.data.user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        return {
          token: response.data.token,
          user:response.data.user
        };
      } else {
        throw new Error('Invalid username or password');
      }
      }
    )
    );
  }
}
