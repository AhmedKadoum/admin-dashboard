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
    return this.http.get<any>('/api/users',{ params: { username, password } }).pipe(
      map((response: any) => {
        const user = response.data.users.find(
          (u: any) =>
            u.username === username && u.password === password
        );
      if (user) {
        // localStorage.setItem('user', JSON.stringify(user));
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
