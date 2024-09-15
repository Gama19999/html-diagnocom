import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../environments/environment';
import { FrameService } from '../services/frame.service';
import { SoundService } from '../services/sound.service';
import { AuthService } from '../services/auth.service';
import { FormComponent } from './form/form.component';
import { LoginStatus } from '../models/login-status.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  private isLoggedSubs!: Subscription;
  isBrowserAuth: boolean = false;
  firstAuthMobile!: boolean;
  browserForm: any;

  constructor(private router: Router, private route: ActivatedRoute, private frameService: FrameService,
              private messageService: MessageService, private soundService: SoundService,
              private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.frameService.disclaimer.next(false);
    this.firstAuthMobile = !this.cookieService.get('biometric');
    this.isLoggedSubs = this.authService.logged.subscribe(status => this.checkBrowserAuth(status));
  }

  private checkBrowserAuth(status: LoginStatus) {
    if (status.logged) {
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'success', summary: 'Autenticación', detail: 'con éxito!' });
    } else if (status.message != '') {
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: status.message });
    }
  }

  toMain(input: any) {
    if ((<HTMLInputElement> input).value === 'biometric_success') {
      this.authService.mobileAuth();
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'success', summary: 'Autenticación exitosa' });
    }
  }

  private nextFrame() {
    this.router.navigate(['/', 'main'], { relativeTo: this.route });
  }

  accederClicked() {
    if (environment.mobile && !this.firstAuthMobile) {
      // @ts-ignore: cordova object
      app.authenticate();
    } else {
      this.isBrowserAuth = true;
      this.browserForm = FormComponent;
    }
  }

  authSuccess() {
    if (this.authService.isLogged) this.nextFrame();
  }

  ngOnDestroy() {
    if (this.isLoggedSubs) this.isLoggedSubs.unsubscribe();
  }
}
