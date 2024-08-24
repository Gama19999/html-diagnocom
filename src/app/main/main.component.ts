import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Se1fComponent } from './se1f/se1f.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  accepted: any = false;
  frame: any = undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  disclaimerCheck(choice: boolean) {
    if (!choice) this.router.navigate(['/login'], { relativeTo: this.route });
    this.accepted = choice;
    this.displayFrame();
  }

  private displayFrame() {
    this.frame = Se1fComponent;
  }
}
