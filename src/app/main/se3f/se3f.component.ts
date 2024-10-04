import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-se3f',
  templateUrl: './se3f.component.html',
  styleUrl: './se3f.component.css',
  providers: [MessageService]
})
export class Se3fComponent implements OnInit, OnDestroy {
  private successSubs!: Subscription;
  private errorSubs!: Subscription;
  private success: boolean = false;
  optVars: {[key: string]: string} = {};
  form: {[key: string]: any} = {'chaining': 'third'};

  constructor(private chainingDataService: ChainingDataService, private frameService: FrameService,
              private messageService: MessageService, private alertService: AlertService) {}

  ngOnInit() {
    for (let opt in this.chainingDataService.optValues) {
      this.optVars[opt] = this.chainingDataService.optValues[opt].txt;
      this.form[opt] = this.chainingDataService.optValues[opt].value;
    }
    this.successSubs = this.chainingDataService.success.subscribe(chainingData => {
      this.success = true;
      this.alertService.info(this.messageService, chainingData['enfermedad'].txt, chainingData['enfermedad'].value);
    });
    this.errorSubs = this.chainingDataService.error.subscribe(failure => this.alertService.warn(this.messageService, failure.data));
  }

  validateChoice(clicked: string) {
    let oldValue = this.form[clicked];
    this.form[clicked] = oldValue === 'si' ? 'no' : 'si';
    if (oldValue === 'si') document.getElementById(clicked)!.classList.remove('selected');
    else document.getElementById(clicked)!.classList.add('selected');
  }

  getResult() {
    if (this.allowClick()) this.chainingDataService.doForwardChain(this.form);
  }

  private allowClick() {
    if (this.success) {
      this.alertService.warn(this.messageService, 'Por favor espere');
      return false;
    } else return true;
  }

  goHome = () => this.frameService.goto('home', true);

  nextAllowed() {
    if (this.success) this.frameService.goto('result', true);
  }

  ngOnDestroy() {
    if (this.successSubs) this.successSubs.unsubscribe();
    if (this.errorSubs) this.errorSubs.unsubscribe();
  }
}
