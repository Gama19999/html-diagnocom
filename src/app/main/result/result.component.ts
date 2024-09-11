import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';
import { SoundService } from '../../services/sound.service';
import { Fact } from '../../models/fact.model';
import { Se1fComponent } from '../se1f/se1f.component';
import { Se2fComponent } from '../se2f/se2f.component';

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
    this.knowledgeSubs = this.chainingDataService.knowledge.subscribe(data => this.knowledge = data);
  }

  returnTo1stFrame() {
    this.chainingDataService.reset();
    this.frameService.frame.next(Se1fComponent);
  }

  returnTo2ndFrame() {
    this.chainingDataService.reset(this.knowledge.afeccion);
    this.frameService.frame.next(Se2fComponent);
  }

  printResult() {
    this.soundService.notificationSound();
    this.messageService.add({ severity: 'success', summary: 'Imprimiendo', detail: 'Feature not activated!' });
  }

  ngOnDestroy(): void {
    if (this.knowledgeSubs) this.knowledgeSubs.unsubscribe();
  }
}
