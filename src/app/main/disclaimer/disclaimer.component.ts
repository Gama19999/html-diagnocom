import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.css'
})
export class DisclaimerComponent {
  @Output('choice') event: EventEmitter<boolean> = new EventEmitter();

  aceptoClicked = () => this.event.emit(true);

  salirClicked = () => this.event.emit(false);
}
