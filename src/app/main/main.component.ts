import { Component } from '@angular/core';

import { FrameService } from '../services/frame.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private frameService: FrameService) {
    this.frameService.goto('disclaimer', true);
  }

}
