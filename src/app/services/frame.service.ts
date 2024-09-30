import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FrameService {
  disclaimer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {}

  goto(path: string) {
    this.router.navigate(['/', 'main', path]);
  }

  reset() {
    this.disclaimer.next(false);
  }
}
