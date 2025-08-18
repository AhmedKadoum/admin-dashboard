import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  // const store=inject(Store);
  // const router=inject(Router);

  return true; // or implement your logic and return true/false/UrlTree
};
