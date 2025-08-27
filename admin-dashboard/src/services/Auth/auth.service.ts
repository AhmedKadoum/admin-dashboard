import { inject, Injectable, Signal } from '@angular/core';
import { authFeatures, User } from '../../app/store/slices/auth/auth.store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { actions } from '../../app/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private store: Store = inject(Store);
  readonly router: Router = inject(Router);

  loading$: Signal<boolean> = this.store.selectSignal(
    authFeatures.selectLoading
  );
  user$: Signal<User | null> = this.store.selectSignal(authFeatures.selectUser);
  token$: Signal<string | null> = this.store.selectSignal(
    authFeatures.selectToken
  );
  error$: Signal<string | null> = this.store.selectSignal(
    authFeatures.selectError
  );

  login(credential: { username: string; password: string }): void {
    this.store.dispatch(actions.auth.login(credential));
  }

  // }

  // private apiUrl= 'http://localhost:3000/users';
  // constructor(private http:HttpClient) { }
  // login(username: string, password: string):Observable<{token:string,user:User}> {
  //   return this.http.get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
  //     map(users => {
  //       if (users.length > 0) {
  //         const user = users[0];
  //         return {token:'fake-jwt-token-' + user.id, user: user};
  //       }
  //       throw new Error('Invalid username or password');
  // }
  //     )
  //   );
  // }
  //  login(username: string, password: string): Observable<any> {
  //   return this.http.get<any[]>('http://localhost:3000/users').pipe(
  //     map(users => {
  //       const user = users.find(u => u.username === username && u.password === password);
  //       if (user) {
  //         localStorage.setItem('user', JSON.stringify(user));
  //       }
  //       return user;
  //     })
  //   );
  // }
}
