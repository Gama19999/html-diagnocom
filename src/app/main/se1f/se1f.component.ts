import { Component } from '@angular/core';
import { ChainingService } from '../../services/chaining.service';

@Component({
  selector: 'app-se1f',
  templateUrl: './se1f.component.html',
  styleUrl: './se1f.component.css'
})
export class Se1fComponent {

  constructor(private chainingService: ChainingService) {}

  callForwardChaining(event: any): void {
    let choice = (<HTMLSpanElement> event.target).getAttribute('data-value');
    let data = [false, false, false, false, false, false].fill(true, +choice!, +choice!+1);
    this.chainingService.doForwardChain(data);
  }

}
