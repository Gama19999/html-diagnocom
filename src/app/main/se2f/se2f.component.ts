import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';
import { SoundService } from '../../services/sound.service';
import { Options } from '../../models/options.model';
import { Fact } from '../../models/fact.model';
import { MessageResponse } from '../../models/message-response.model';
import { Se1fComponent } from '../se1f/se1f.component';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-se2f',
  templateUrl: './se2f.component.html',
  styleUrl: './se2f.component.css',
  providers: [MessageService]
})
export class Se2fComponent implements OnInit, OnDestroy {
  private optionsSubs!: Subscription;
  private knowledgeSubs!: Subscription;
  private errorSubs!: Subscription;

  knowledge!: Fact;
  options!: Options;

  constructor(private chainingDataService: ChainingDataService, private frameService: FrameService,
              private messageService: MessageService, private soundService: SoundService) {}

  ngOnInit() {
    this.optionsSubs = this.chainingDataService.options.subscribe(data => this.options = data);
    this.knowledgeSubs = this.chainingDataService.knowledge.subscribe(data => this.handleKnowledge(data));
    this.errorSubs = this.chainingDataService.lastError.subscribe(errorData => this.checkChainingError(errorData));
  }

  private handleKnowledge(data: Fact) {
    this.knowledge = data;
    if (data.enfermedad) {
        this.soundService.notificationSound();
        this.messageService.add({ severity: 'info', summary: '2do Encadenamiento', detail: this.knowledge.enfermedad });
    }
  }

  private checkChainingError(error: MessageResponse) {
    if (error.status === 404) {
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: error.data });
    }
  }

  validateChoice(clicked: string, form: NgForm) {
    let value = form.form.controls[clicked].value;
    form.form.controls[clicked].setValue(value === 'si' ? 'no' : 'si');
    if (value === 'si') document.getElementById(clicked)!.classList.remove('selected');
    else document.getElementById(clicked)!.classList.add('selected');
  }

  changeFrame() {
    if (this.knowledge.enfermedad) this.frameService.frame.next(ResultComponent);
  }

  callForwardChaining(form: NgForm) {
    this.chainingDataService.doForwardChain(form.form.value);
  }

  returnTo1stFrame() {
    this.chainingDataService.reset();
    this.frameService.frame.next(Se1fComponent);
  }

  ngOnDestroy() {
    if (this.optionsSubs) this.optionsSubs.unsubscribe();
    if (this.knowledgeSubs) this.knowledgeSubs.unsubscribe();
    if (this.errorSubs) this.errorSubs.unsubscribe();
  }
}
