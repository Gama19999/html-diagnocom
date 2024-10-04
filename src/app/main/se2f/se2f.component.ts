import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-se2f',
  templateUrl: './se2f.component.html',
  styleUrl: './se2f.component.css',
  providers: [MessageService]
})
export class Se2fComponent implements OnInit, OnDestroy {
  private successSubs!: Subscription;
  private errorSubs!: Subscription;
  private success: boolean = false;
  private locked: boolean = false;
  optVars: {[key: string]: string} = {};
  form: {[key: string]: any} = {'chaining': 'second'};

  constructor(private chainingDataService: ChainingDataService, private messageService: MessageService,
              private frameService: FrameService, private alertService: AlertService) {}

  ngOnInit() {
    for (let opt in this.chainingDataService.optValues) {
      this.optVars[opt] = this.chainingDataService.optValues[opt].txt;
      this.form[opt] = this.chainingDataService.optValues[opt].value;
    }
    this.successSubs = this.chainingDataService.success.subscribe(chainingData => {
      this.success = true;
      this.alertService.info(this.messageService, chainingData['localizacion'].txt, chainingData['localizacion'].value);
    });
    this.errorSubs = this.chainingDataService.error.subscribe(failure => this.alertService.error(this.messageService, failure.data));
  }

  validateChoices(clicked: string) {
    if (this.allowClick()) {
      this.form[clicked] = 'si';
      this.chainingDataService.optValues[clicked].value = 'si';
      for (let control in this.form)
        if (control !== 'chaining' && control !== 'grados' && control !== clicked) this.form[control] = 'no';
      this.chainingDataService.doForwardChain(this.form);
    }
  }

  private allowClick() {
    if (!this.locked) {
      this.locked = true;
      return true;
    } else {
      this.alertService.warn(this.messageService, 'Por favor espere');
      return false;
    }
  }

  goHome = () => this.frameService.goto('home', true);

  nextAllowed() {
    if (this.success) this.frameService.goto('se3f', true);
  }

  ngOnDestroy() {
    if (this.successSubs) this.successSubs.unsubscribe();
    if (this.errorSubs) this.errorSubs.unsubscribe();
  }
}
