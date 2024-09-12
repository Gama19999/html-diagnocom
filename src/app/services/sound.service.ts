import { Injectable } from '@angular/core';

import { Howl } from 'howler';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private notification: Howl;

  constructor() {
    this.notification = new Howl({
      src: ['../../assets/sounds/land3.mp3'],
      html5: true
    });
  }

  notificationSound() {
    this.notification.play();
  }
}
