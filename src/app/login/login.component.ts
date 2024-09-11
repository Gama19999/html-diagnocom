import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FrameService } from '../services/frame.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

  constructor(private router: Router, private route: ActivatedRoute, private frameService: FrameService) {}

  ngAfterViewInit(): void {
    this.frameService.disclaimer.next(false);
  }

  accederClicked() {
    if (environment.mobile) {
      // @ts-ignore
      app.authenticate();
    } else {
      // TODO user-password auth when using browser
      this.nextFrame();
    }
  }

  toMain(input: any) {
    console.log(input);
    if ((<HTMLInputElement> input).value === 'biometric_success') this.nextFrame();
  }

  private nextFrame() {
    this.router.navigate(['/', 'main'], { relativeTo: this.route });
  }
}
