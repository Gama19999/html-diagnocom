import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  if (!request.url.includes('auth')) {
    request = request.clone({setHeaders: {'Authorization': inject(CookieService).get('token')}});
  }
  return next(request);
};
