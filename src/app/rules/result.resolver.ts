import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { ResultService } from '../services/result.service';
import { ResultResponse } from '../models/brb/result-response.model';

export const resultResolver: ResolveFn<ResultResponse> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(ResultService).getResult(route.params['id']);
};
