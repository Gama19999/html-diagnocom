import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FrameService {
  frame: BehaviorSubject<any> = new BehaviorSubject(undefined);
  disclaimer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  reset() {
    this.frame.next(undefined);
    this.disclaimer.next(false);
  }
}
