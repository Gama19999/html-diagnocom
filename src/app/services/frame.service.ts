import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FrameService {
  public frame: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public disclaimer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
}
