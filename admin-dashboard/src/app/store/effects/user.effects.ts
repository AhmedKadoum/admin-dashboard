// src/app/store/user/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as UserActions from '../slices/users/users.store';
import { User } from '../../../services/mock-api/mock-data.service';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.actions.loadUsers),
      mergeMap(() =>
        this.http.get<User[]>('/api/users').pipe(
          map(users => UserActions.actions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.actions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.actions.addUser),
      mergeMap(({ user }) =>
        this.http.post<User>('/api/users', user).pipe(
          map(newUser => UserActions.actions.addUserSuccess({ user: newUser })),
          catchError(error => of(UserActions.actions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}
