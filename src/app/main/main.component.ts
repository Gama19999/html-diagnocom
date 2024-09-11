import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FrameService } from '../services/frame.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, OnDestroy {
  accepted: boolean = false;
  frame: any;

  private disclaimerSubs!: Subscription;
  private frameSubs!: Subscription;

  constructor(private frameService: FrameService) {}

  ngOnInit() {
    this.disclaimerSubs = this.frameService.disclaimer.subscribe(value => this.accepted = value);
    this.frameSubs = this.frameService.frame.subscribe(component => this.frame = component);
  }

  ngOnDestroy() {
    if (this.frameSubs) this.frameSubs.unsubscribe();
    if (this.disclaimerSubs) this.disclaimerSubs.unsubscribe();
    this.frameService.disclaimer.next(false);
    this.frameService.frame.next(undefined);
  }
}
