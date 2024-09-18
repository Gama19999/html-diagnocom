import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../environments/environment';
import { FrameService } from './frame.service';
import { ChainingDataService } from './chaining-data.service';
import { MessageResponse } from '../models/message-response.model';
import { AuthStatus } from '../models/auth-status.model';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private sessionTimeoutId: any;
  private sessionListener = () => { this.sessionTimeout(); };
  private authStatus: AuthStatus = new AuthStatus();
  appAuth: BehaviorSubject<AuthStatus> = new BehaviorSubject(this.authStatus);

  constructor(private http: HttpClient, private cookieService: CookieService, private frameService: FrameService,
              private router: Router, private chainingDataService: ChainingDataService) {}

  get isLogged() { return this.cookieService.get('token') && this.authStatus.authenticated; }

  browserAuth(data: any) {
    this.enableBiometrics(data);
    this.http.post<MessageResponse>(environment.api + 'auth/' + data.action, {'object': data}).subscribe({
      next: success => this.handleSuccess(success),
      error: failure => this.handleFailureResponse(failure)
    });
  }

  private enableBiometrics(data: any) {
    if (data.biometrics) this.cookieService.set('biometrics', JSON.stringify(data), 30);
  }

  private handleSuccess(success: MessageResponse) {
    this.authStatus.authenticated = true;
    this.cookieService.set('token', success.data.token, 1);
    this.authStatus.wasRegistration = success.status == 201;
    this.addSessionListener();
    this.appAuth.next(this.authStatus);
  }

  private addSessionListener() {
    document.addEventListener("visibilitychange", this.sessionListener);
    console.log('Added session listener!');
  }

  private handleFailureResponse(error: any) {
    console.log(error);
    this.cookieService.delete('biometrics');
    this.authStatus.errorMessage = error.error.data;
    this.appAuth.next(this.authStatus);
  }

  mobileAuth() {
    let biometricsData = JSON.parse(this.cookieService.get('biometrics'));
    biometricsData.biometrics = false;
    biometricsData.action = 'login';
    this.browserAuth(biometricsData);
  }

  logout() {
    this.cookieService.delete('token');
    this.chainingDataService.reset();
    this.frameService.reset();
    this.authStatus.reset();
    this.detachSessionListener();
    this.router.navigate(['/']);
    console.log('Logout success!');
  }

  private detachSessionListener() {
    document.removeEventListener("visibilitychange", this.sessionListener);
    console.log('Detached session listener!');
  }

  private sessionTimeout() {
    if (this.sessionTimeoutId) {
      console.log('Session destroy timeout cancelled!');
      clearTimeout(this.sessionTimeoutId);
    }
    if (document.hidden) {
      console.log('Session destroy timeout started!');
      this.sessionTimeoutId = setTimeout(() => { this.logout(); }, 5000);
    }
  }
}
