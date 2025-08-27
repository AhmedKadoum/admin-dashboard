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
      ofType(AuthActions.actions.login), // when [Auth] Login dispatched
      tap(() => console.log('🔄 Authentication effect triggered')),
      tap(() => this.router.navigate(['/dashboard'])),
      exhaustMap(({ username, password }) =>
        this.apiAuthService.fetchUserData(username, password).pipe(
          map((response: AuthState) =>
            AuthActions.actions.loginSuccess({
              token: response.token as string,
              user: response.user as AuthActions.User,
            })
          ),
          catchError((error) =>
            of(AuthActions.actions.loginFailure({ error: error.message }))
          )
        )
      )
    )
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
