import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { environment } from '../../../environments/environment';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  providers: [MessageService]
})
export class FormComponent implements OnInit {
  isMobile: boolean = environment.mobile;
  form!: FormGroup;

  constructor(private alertService: AlertService, private messageService: MessageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      action: new FormControl('login', Validators.required)
    });
    if (this.isMobile) this.form.addControl('biometrics', new FormControl(false, Validators.required));
  }

  browserAuth() {
    if (this.validForm()) {
      this.authService.browserAuth(this.form.value);
    }
  }

  private validForm() {
    if (!this.form.valid) this.alertService.error(this.messageService, 'Usuario o Contraseña vacios!');
    return this.form.valid;
  }

  setAction = (action: string) => this.form.controls['action'].setValue(action);
}
