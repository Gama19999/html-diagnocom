import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  providers: [MessageService]
})
export class FormComponent implements OnInit {
  @Input('isLogin') isLogin: any;
  form!: FormGroup;

  constructor(private soundService: SoundService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required)
    });
  }

  browserAuth() { // TODO login/registration logic
    if (this.validForm()) {
      let message = this.isLogin ? 'Autenticación validada!' : 'Registro validado!';
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message });
    }
  }

  validForm() {
    if (!this.form.valid) {
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o Contraseña vacios' });
    }
    return this.form.valid;
  }
}
