import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { environment } from '../../environments/environment';
import { FrameService } from '../services/frame.service';
import { SoundService } from '../services/sound.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  isBrowserAuth: boolean = false;
  browserForm: any;
  isLogin: any = true;

  constructor(private router: Router, private route: ActivatedRoute, private frameService: FrameService,
              private messageService: MessageService, private soundService: SoundService) {}

  ngOnInit(): void {
    this.frameService.disclaimer.next(false);
  }

  toMain(input: any) {
    if ((<HTMLInputElement> input).value === 'biometric_success') {
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'success', summary: 'Autenticación exitosa' });
      this.nextFrame();
    }
  }

  private nextFrame() {
    this.router.navigate(['/', 'main'], { relativeTo: this.route });
  }

  accederClicked() {
    if (environment.mobile) {
      // @ts-ignore: cordova object
      app.authenticate();
    } else {
      this.isBrowserAuth = true;
      this.browserForm = FormComponent;
    }
  }

  registrar() {
    this.isBrowserAuth = true;
    this.isLogin = false;
    this.browserForm = FormComponent;
  }
}
