import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}

  accederClicked() {
    if (this.auth()) this.router.navigate(['/', 'main'], { relativeTo: this.route });
  }

  private auth() {
    return true;
  }
}
