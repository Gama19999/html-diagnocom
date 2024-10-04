import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ChainingDataService } from './chaining-data.service';

@Injectable({ providedIn: 'root' })
export class FrameService {
  disclaimer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private chainingDataService: ChainingDataService) {}

  goto(path: string, replaceCurrent: boolean = false) {
    if (path === 'home') this.chainingDataService.reset();
    this.router.navigate(['/', 'main', path], {replaceUrl: replaceCurrent});
  }

  reset() {
    this.disclaimer.next(false);
  }
}
