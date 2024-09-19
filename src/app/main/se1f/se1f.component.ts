import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';
import { SoundService } from '../../services/sound.service';
import { Fact } from '../../models/fact.model';
import { HomeComponent } from '../home/home.component';
import { Se2fComponent } from '../se2f/se2f.component';

@Component({
  selector: 'app-se1f',
  templateUrl: './se1f.component.html',
  styleUrl: './se1f.component.css',
  providers: [MessageService]
})
export class Se1fComponent implements OnInit, OnDestroy {
  private knowledgeSubs!: Subscription;
  private knowledge!: Fact;

  constructor(private chainingDataService: ChainingDataService, private messageService: MessageService,
              private frameService: FrameService, private soundService: SoundService) {}

  ngOnInit() {
    this.knowledgeSubs = this.chainingDataService.knowledge.subscribe(data => this.displayKnowledge(data));
  }

  private displayKnowledge(data: Fact) {
    this.knowledge = data;
    if (data.afeccion) {
      this.soundService.notificationSound();
      this.messageService.add({ severity: 'info', summary: '1er Encadenamiento', detail: this.knowledge.afeccion });
    }
  }

  validateChoices(element: any, form: NgForm) {
    let controls = form.form.controls;
    let clicked = (<HTMLSpanElement> element).children[0].getAttribute('name')!;
    controls[clicked].setValue('si');
    for (let control in controls) if (control !== clicked) controls[control].setValue('no');
    this.chainingDataService.doForwardChain(form.form.value);
  }

  changeFrame = () => this.frameService.frame.next(Se2fComponent);

  returnToHome() {
    this.frameService.frame.next(HomeComponent);
    this.chainingDataService.reset();
  }

  ngOnDestroy() {
    if (this.knowledgeSubs) this.knowledgeSubs.unsubscribe();
  }
}
