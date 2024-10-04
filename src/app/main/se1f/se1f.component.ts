import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-se1f',
  templateUrl: './se1f.component.html',
  styleUrl: './se1f.component.css',
  providers: [MessageService]
})
export class Se1fComponent implements OnInit, OnDestroy {
  private successSubs!: Subscription;
  private errorSubs!: Subscription;
  private success: boolean = false;
  private locked: boolean = false;
  form: {[key: string]: any} = {'chaining': 'first', 'grados': 37.0};

  constructor(private chainingDataService: ChainingDataService, private frameService: FrameService,
              private messageService: MessageService, private alertService: AlertService) {}

  ngOnInit() {
    this.successSubs = this.chainingDataService.success.subscribe(chainingData => {
      this.success = true;
      this.alertService.info(this.messageService, chainingData['temperatura'].txt, chainingData['temperatura'].value);
    });
    this.errorSubs = this.chainingDataService.error.subscribe(failure => this.alertService.error(this.messageService, failure.data));
  }

  validateChoice() {
    if (this.allowClick()) this.chainingDataService.doForwardChain(this.form);
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
    if (this.success) this.frameService.goto('se2f', true);
  }

  ngOnDestroy() {
    if (this.successSubs) this.successSubs.unsubscribe();
    if (this.errorSubs) this.errorSubs.unsubscribe();
  }
}
