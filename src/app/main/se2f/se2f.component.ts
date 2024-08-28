import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';
import { Options } from '../../models/options.model';
import { Se1fComponent } from '../se1f/se1f.component';

@Component({
  selector: 'app-se2f',
  templateUrl: './se2f.component.html',
  styleUrl: './se2f.component.css',
  providers: [MessageService]
})
export class Se2fComponent implements OnInit, OnDestroy {
  private optionsSubs!: Subscription;
  options!: Options;
  afeccion!: string;

  constructor(private chainingDataService: ChainingDataService, private frameService: FrameService) {}

  ngOnInit() {
    this.optionsSubs = this.chainingDataService.options.subscribe(data => this.options = data);
    this.afeccion = this.chainingDataService.condition;
  }

  validateChoice(clicked: string, form: NgForm) {
    let value = form.form.controls[clicked].value;
    form.form.controls[clicked].setValue(value === 'si' ? 'no' : 'si');
    if (value === 'si') document.getElementById(clicked)!.classList.remove('selected');
    else document.getElementById(clicked)!.classList.add('selected');
  }

  callForwardChaining(form: NgForm) {
    this.chainingDataService.doForwardChain(form.form.value);
  }

  returnTo1stFrame() {
    this.frameService.frame.next(Se1fComponent);
  }

  ngOnDestroy() {
    if (this.optionsSubs) this.optionsSubs.unsubscribe();
  }
}
