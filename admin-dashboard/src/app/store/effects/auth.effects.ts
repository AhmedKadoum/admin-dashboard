import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../slices/auth/auth.store';
import { AuthService } from '../../../services/Auth/auth.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  // 🔹 Effect listens for Login action
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.actions.login), // when [Auth] Login dispatched
      tap(() => console.log('🔄 Authentication effect triggered')),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(response =>
            AuthActions.actions.loginSuccess({ token: response.token, user: response.user })
          ),
          catchError(error =>
            of(AuthActions.actions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // 🔹 On login success → save auth info to localStorage
  persistAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.actions.loginSuccess),
        tap(({ token, user }) => {
          localStorage.setItem('auth', JSON.stringify({ token, user }));
        })
      ),
    { dispatch: false }
  );

  // 🔹 On logout → clear localStorage
  clearAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.actions.logout),
        tap(() => {
          localStorage.removeItem('auth');
        })
      ),
    { dispatch: false }
  );
}
