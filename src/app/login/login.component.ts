import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../environments/environment';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../models/auth-status.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  private appAuthSubs!: Subscription;
  isBrowserAuth: boolean = false;
  firstAuthMobile!: boolean;

  constructor(private messageService: MessageService, private alertService: AlertService, private router: Router,
              private authService: AuthService, private cookieService: CookieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.authService.logout();
    this.firstAuthMobile = !this.cookieService.get('biometrics');
    this.appAuthSubs = this.authService.appAuth.subscribe(data => this.checkAppAuth(data));
  }

  private checkAppAuth(appAuth: AuthStatus) {
    if (appAuth.authenticated) {
      let title = appAuth.wasRegistration ? 'Registro' : 'Autenticación';
      this.alertService.success(this.messageService, title, 'con éxito!');
    } else if (appAuth.errorMessage) {
      this.alertService.error(this.messageService, appAuth.errorMessage);
    }
  }

  authPrompt() {
    if (environment.mobile && !this.firstAuthMobile) {
      // @ts-ignore: cordova bioAuth method
      app.bioAuth();
    } else this.browserAuth();
  }

  private browserAuth() {
    this.alertService.info(this.messageService, 'Autenticación', 'por contraseña');
    document.getElementById('login-acceder-btn')!.classList.add('hidden');
    this.isBrowserAuth = true;
    document.getElementById('login-form')!.classList.remove('hidden');
  }

  mobileAuth(input: any) {
    let result = (<HTMLInputElement> input).value;
    switch (result) {
      case 'biometric_success':
        this.authService.mobileAuth();
        break;
      case 'BIOMETRIC_DISMISSED':
        // @ts-ignore: cordova bioAuth method
        app.bioAuth();
        break;
      default:
        this.cookieService.delete('biometrics');
        this.browserAuth();
    }
  }

  isAuthSuccess() {
    if (this.authService.isLogged) this.router.navigate(['/', 'main'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.appAuthSubs) this.appAuthSubs.unsubscribe();
  }
}
