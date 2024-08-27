import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  private frameSubs!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private frameService: FrameService) {}

  ngOnInit() {
    this.frameSubs = this.frameService.frame.subscribe(component => this.frame = component);
  }

  disclaimerCheck(choice: boolean) {
    if (!choice) this.router.navigate(['/login'], { relativeTo: this.route });
    this.accepted = choice;
  }

  ngOnDestroy() {
    if (this.frameSubs) this.frameSubs.unsubscribe();
  }
}
