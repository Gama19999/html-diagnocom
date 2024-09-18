import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { environment } from '../../../environments/environment';
import { SoundService } from '../../services/sound.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  providers: [MessageService]
})
export class FormComponent implements OnInit {
  isMobile: boolean = environment.mobile;
  form!: FormGroup;

  constructor(private soundService: SoundService, private messageService: MessageService, private authService: AuthService) {}

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
    if (!this.form.valid) {
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o Contraseña vacios' });
    }
    return this.form.valid;
  }

  setAction = (action: string) => this.form.controls['action'].setValue(action);
}
