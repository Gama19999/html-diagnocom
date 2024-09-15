import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../environments/environment';
import { MessageResponse } from '../models/message-response.model';
import { LoginStatus } from '../models/login-status.model';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private loginStatus: LoginStatus = new LoginStatus(false, '');
  public logged: BehaviorSubject<LoginStatus> = new BehaviorSubject(this.loginStatus);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  get isLogged() { return this.cookieService.get('token') && this.loginStatus.logged; }

  browserAuth(data: any) {
    this.checkBiometricsChoice(data);
    this.http.post<MessageResponse>(environment.api + 'auth/' + data.action, {'object': data}).subscribe({
      next: response => this.handleAuthResponse(response),
      error: failure => this.handleFailureResponse(failure)
    });
  }

  private checkBiometricsChoice(data: any) {
    if (data.biometric) this.cookieService.set('biometric', JSON.stringify(data), 30);
  }

  private handleAuthResponse(response: MessageResponse) {
    this.loginStatus.logged = true;
    this.cookieService.set('token', response.data.token, 1);
    this.logged.next(this.loginStatus);
  }

  private handleFailureResponse(error: any) {
    this.cookieService.delete('biometric');
    console.log(error);
    this.loginStatus.message = error.error.data;
    this.logged.next(this.loginStatus);
  }

  mobileAuth() {
    let biometricData = JSON.parse(this.cookieService.get('biometric'));
    biometricData.biometric = false;
    biometricData.action = 'login';
    this.browserAuth(biometricData);
  }

  logout() {
    this.cookieService.delete('token');
    this.loginStatus.logged = false;
    this.loginStatus.message = '';
  }
}
