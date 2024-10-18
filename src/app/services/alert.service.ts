import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Howl } from 'howler';
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AlertService {
  private notification: Howl;

  constructor() {
    this.notification = new Howl({
      src: [environment.sound],
      html5: true
    });
  }

  success(msgService: MessageService, title: string, content: string) {
    this.notification.play();
    msgService.add({severity: 'success', summary: title, detail: content});
  }

  info(msgService: MessageService, title: string, content: string) {
    this.notification.play();
    msgService.add({severity: 'info', summary: title, detail: content});
  }

  warn(msgService: MessageService, content: string) {
    this.notification.play();
    msgService.add({severity: 'warn', summary: 'Atención', detail: content});
  }

  error(msgService: MessageService, content: string) {
    this.notification.play();
    msgService.add({severity: 'error', summary: 'Error', detail: content});
  }

  notificationSound() {
    this.notification.play();
  }
}
