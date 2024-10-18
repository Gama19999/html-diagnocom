import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ChainingDataService } from './chaining-data.service';

@Injectable({ providedIn: 'root' })
export class FrameService {
  disclaimer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private chainingDataService: ChainingDataService) {}

  goto(path: string, replaceCurrent: boolean = false) {
    switch (path) {
      case 'disclaimer': break;
      case 'home': this.home(); break;
      case 'settings': this.settings(); break;
      case 'se3f': this.se3f();
    }
    this.router.navigate(['/', 'main', path], {replaceUrl: replaceCurrent});
  }

  home() {
    this.chainingDataService.reset();
    this.clearBackground();
    document.getElementById('main')!.classList.add('main-bg');
  }

  settings() {
    this.clearBackground();
    document.getElementById('main')!.classList.add('settings-bg');
  }

  private se3f() {
    this.clearBackground();
    document.getElementById('main')!.classList.add(this.chainingDataService.chainingData['localizacion'].value + '-bg');
  }

  private clearBackground() {
    const classes = document.getElementById('main')!.classList;
    let removing = '';
    for (let i = 0; i < classes.length; i++) if (classes.item(i)!.includes('-bg')) removing = classes.item(i)!;
    document.getElementById('main')!.classList.remove(removing);
  }

  reset() {
    this.disclaimer.next(false);
  }
}
