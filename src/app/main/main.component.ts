import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  accepted: any = undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  disclaimerCheck(choice: boolean) {
    if (!choice) this.router.navigate(['/login'], { relativeTo: this.route });
    else this.accepted = choice;
  }
}
