import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

export const browserGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return environment.mobile || inject(AuthService).isLogged ? true : inject(Router).createUrlTree(['/', 'login']);
};
