import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ChainingLogicService } from '../../services/chaining.service';

@Component({
  selector: 'app-se1f',
  templateUrl: './se1f.component.html',
  styleUrl: './se1f.component.css'
})
export class Se1fComponent {

  constructor(private chainingLogicService: ChainingLogicService) {}

  validateChoices(element: any, form: NgForm) {
    let controls = form.form.controls;
    let clicked = (<HTMLSpanElement> element).children[0].getAttribute('name')!;
    controls[clicked].setValue('si');
    for (let control in controls) if (control !== clicked) controls[control].setValue('no');
    this.chainingLogicService.doForwardChain(form.form.value);
  }
}
