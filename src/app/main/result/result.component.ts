import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';
import { SoundService } from '../../services/sound.service';
import { Fact } from '../../models/fact.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
  providers: [MessageService]
})
export class ResultComponent implements OnInit, OnDestroy {
  private knowledgeSubs!: Subscription;
  knowledge!: Fact;

  constructor(private chainingDataService: ChainingDataService, private frameService: FrameService,
              private messageService: MessageService, private soundService: SoundService) {}

  ngOnInit(): void {
    this.knowledgeSubs = this.chainingDataService.knowledge.subscribe(data => this.checkKnowledge(data));
  }

  private checkKnowledge(data: Fact) {
    this.knowledge = data;
    if (!data.enfermedad) {
      this.chainingDataService.reset();
      this.frameService.goto('se1f');
    }
  }

  returnTo1stFrame() {
    this.chainingDataService.reset();
    this.frameService.goto('se1f');
  }

  returnTo2ndFrame() {
    this.chainingDataService.reset(this.knowledge.afeccion);
    this.frameService.goto('se2f');
  }

  printResult() {
    this.soundService.notificationSound();
    this.messageService.add({ severity: 'secondary', summary: 'Imprimiendo', detail: 'Feature not activated!' });
  }

  ngOnDestroy(): void {
    if (this.knowledgeSubs) this.knowledgeSubs.unsubscribe();
  }
}
