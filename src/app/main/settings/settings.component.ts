import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { FrameService} from '../../services/frame.service';
import { SoundService } from '../../services/sound.service';
import { UserService } from '../../services/user.service';
import { UserData } from '../../models/user-data.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  providers: [ConfirmationService, MessageService]
})
export class SettingsComponent implements OnInit, OnDestroy {
  private userDataSubs!: Subscription;
  private userData!: UserData;
  form!: FormGroup;

  constructor(private frameService: FrameService, private confirmService: ConfirmationService,
              private messageService: MessageService, private soundService: SoundService,
              private userService: UserService) {}

  ngOnInit() {
    this.userDataSubs = this.userService.userData.subscribe(user => this.checkUserData(user));
    this.form = new FormGroup({
      username: new FormControl(this.userData.username, Validators.required),
      email: new FormControl(this.userData.email, [Validators.required, Validators.email]),
      currentPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null)
    });
  }

  private checkUserData(data: UserData) {
    this.userData = data;
    if (data.error) {
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: data.error });
    } else if (this.form.touched) {
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'success', summary: 'Operación', detail: 'exitosa!' });
      this.form.reset({username: this.userData.username, email: this.userData.email});
    }
  }

  updateUser() {
    if(this.validForm()) this.userService.updateUserData(this.form.value);
  }

  private validForm() {
    if (!this.form.valid) {
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos requeridos vacios' });
    }
    return this.form.valid;
  }

  returnToHome() {
    if (this.form.touched) {
      this.soundService.notificationSound();
      this.confirmService.confirm({
        message: '¿Descartar los cambios?',
        header: 'Atención',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        acceptLabel: 'Aceptar',
        acceptButtonStyleClass: 'settings-discard-changes',
        rejectIcon: 'none',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'settings-cancel-return',
        accept: () => this.frameService.goto('home'),
        reject: () => {
          this.soundService.notificationSound();
          this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'cambios sin guardar!' })
        }
      });
    } else this.frameService.goto('home');
  }

  ngOnDestroy() {
    if(this.userDataSubs) this.userDataSubs.unsubscribe();
  }
}
