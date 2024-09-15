import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FrameService } from '../../services/frame.service';
import { AuthService } from '../../services/auth.service';
import { Se1fComponent } from '../se1f/se1f.component';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.css'
})
export class DisclaimerComponent {

  constructor(private frameService: FrameService, private router: Router, private route: ActivatedRoute,
              private authService: AuthService) {}

  aceptoClicked() {
    this.frameService.disclaimer.next(true);
    this.frameService.frame.next(Se1fComponent);
  }

  salirClicked() {
    this.authService.logout();
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
}
