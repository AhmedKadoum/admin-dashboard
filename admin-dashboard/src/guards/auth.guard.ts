// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { map, take } from 'rxjs';

// export const authGuard: CanActivateFn = () => {
//   const store = inject(Store);
//   const router = inject(Router);

//   return store.select('auth').pipe(
//     take(1), // automatically complete the observable
//     map(auth => {
//       if (auth.user) return true;
//       router.navigate(['/login']);
//       return false;
//     })
//   );
// };
