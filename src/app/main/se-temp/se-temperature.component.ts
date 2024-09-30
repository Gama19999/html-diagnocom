import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';

@Component({
  selector: 'app-se-temp',
  templateUrl: './se-temperature.component.html',
  styleUrl: './se-temperature.component.css'
})
export class SeTemperatureComponent implements OnInit, OnDestroy {
  private optionsSubs!: Subscription;
  temperature!: number;

  constructor(private chainingDataService: ChainingDataService, private frameService: FrameService) {}

  ngOnInit() {
    this.optionsSubs = this.chainingDataService.options.subscribe(data => this.extractTemperature(data));
  }

  private extractTemperature(options: any) {
    for (let key in options) {
      if (options[key]['name'] === 'temperatura') {
        this.temperature = +options[key]['value'];
        return;
      }
    }
  }

  returnTo1stFrame() {
    this.chainingDataService.reset();
    this.frameService.goto('se1f');
  }

  goto2ndFrame() {
    this.chainingDataService.submitTemperature(this.temperature);
    this.frameService.goto('se2f');
  }

  ngOnDestroy() {
    if (this.optionsSubs) this.optionsSubs.unsubscribe();
  }
}
