import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../../store/slices/auth/auth.store';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { apiAuthService } from '../../../services/Auth/api/apiAuth.service';
import { AuthState } from '../../../app/store/slices/auth/auth.store';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private apiAuthService: apiAuthService = inject(apiAuthService);
  private actions$: Actions = inject(Actions);
  private router: Router = inject(Router);

  // 🔹 Effect listens for Login action
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.actions.login),
      tap(() => console.log('🔄 Authentication effect triggered')),
      // tap(() => this.router.navigate(['/dashboard'])),

      exhaustMap(({credential}) =>
        this.apiAuthService.fetchUserData(credential.username,credential.password).pipe(
          map((response:{token:any,user:any}) =>
            AuthActions.actions.loginSuccess({
              token:response.token,
              user:response.user
            })
          ),
          tap(() => console.log('Login effect processed',credential)),
          catchError((error) =>
            of(AuthActions.actions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );
loginSuccess$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AuthActions.actions.loginSuccess),
      tap(({ user }) => {
        if (user.role === 'Admin'|| user.role === 'Readonly') {
          this.router.navigate(['/dashboard']);
        } else {
         console.log('Access denied - Admins only');
        }
      }),
      tap(({ token, user }) => {
          localStorage.setItem('auth', JSON.stringify({ token, user }));
      }),
      tap(() => console.log('Login successful, navigating...'))
    ),
  { dispatch: false }
);
  // 🔹 On login success → save auth info to localStorage
  // persistAuth$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.actions.loginSuccess),
  //       tap(({ token, user }) => {
  //         localStorage.setItem('auth', JSON.stringify({ token, user }));
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // 🔹 On logout → clear localStorage
  // clearAuth$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.actions.logout),
  //       tap(() => {
  //         localStorage.removeItem('auth');
  //       })
  //     ),
  //   { dispatch: false }
  // );
}
