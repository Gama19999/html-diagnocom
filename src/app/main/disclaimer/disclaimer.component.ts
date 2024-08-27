import { Component, EventEmitter, Output } from '@angular/core';

import { FrameService } from '../../services/frame.service';
import { Se1fComponent } from '../se1f/se1f.component';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.css'
})
export class DisclaimerComponent {
  @Output('choice') event: EventEmitter<boolean> = new EventEmitter();

  constructor(private frameService: FrameService) {}

  aceptoClicked() {
    this.event.emit(true);
    this.frameService.frame.next(Se1fComponent);
  }

  salirClicked = () => this.event.emit(false);
}
