import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  let modifiedRequest = request;
  if (!request.url.includes('auth')) {
    modifiedRequest = modifiedRequest.clone({setHeaders: {'Authorization': inject(CookieService).get('token')}});
  }
  return next(modifiedRequest);
};
