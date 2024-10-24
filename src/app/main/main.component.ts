import { Component } from '@angular/core';

import { environment } from '../../environments/environment';
import { FrameService } from '../services/frame.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  version: string = environment.version;

  constructor(private frameService: FrameService) {
    this.frameService.goto('disclaimer', true);
  }

  resultLoad(input: any) {
    let resultLoadURL = (<HTMLInputElement> input).value;
    this.frameService.loadResult(resultLoadURL);
    console.log('<<<DiagnoCom HTML>>> Loading result with ID: ', resultLoadURL.split('/')[2]);
  }

}
