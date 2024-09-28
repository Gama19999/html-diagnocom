import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';
import { Se1fComponent } from '../se1f/se1f.component';
import { Se2fComponent } from '../se2f/se2f.component';

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
    this.frameService.frame.next(Se1fComponent);
  }

  goto2ndFrame() {
    this.chainingDataService.submitTemperature(this.temperature);
    console.log('Temperatura: ' + this.temperature);
    this.frameService.frame.next(Se2fComponent);
  }

  ngOnDestroy() {
    if (this.optionsSubs) this.optionsSubs.unsubscribe();
  }
}
