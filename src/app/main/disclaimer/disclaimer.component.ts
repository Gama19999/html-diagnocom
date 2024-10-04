import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FrameService } from '../../services/frame.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.css'
})
export class DisclaimerComponent implements OnInit, OnDestroy {
  private disclaimerSubs!: Subscription;

  constructor(private frameService: FrameService, private authService: AuthService) {}

  ngOnInit() {
    this.disclaimerSubs = this.frameService.disclaimer.subscribe(accepted => {
      if (accepted) this.frameService.goto('home');
    });
  }

  aceptoClicked() {
    this.frameService.disclaimer.next(true);
    this.frameService.goto('home');
  }

  salirClicked = () => this.authService.logout();

  ngOnDestroy() {
    if (this.disclaimerSubs) this.disclaimerSubs.unsubscribe();
  }
}
