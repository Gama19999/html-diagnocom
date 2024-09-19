import { Component } from '@angular/core';

import { FrameService } from '../../services/frame.service';
import { AuthService } from '../../services/auth.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.css'
})
export class DisclaimerComponent {

  constructor(private frameService: FrameService, private authService: AuthService) {}

  aceptoClicked() {
    this.frameService.disclaimer.next(true);
    this.frameService.frame.next(HomeComponent);
  }

  salirClicked() {
    this.authService.logout();
  }
}
