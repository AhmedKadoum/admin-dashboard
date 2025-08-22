import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../app/store/slices/auth/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl= 'http://localhost:3000/users';
  constructor(private http:HttpClient) { }
  login(username: string, password: string):Observable<{token:string,user:User}> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          return {token:'fake-jwt-token-' + user.id, user: user};
        }
        throw new Error('Invalid username or password');
  }
      )
    );
  }
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
