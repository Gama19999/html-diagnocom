import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';
import { AlertService } from '../../services/alert.service';
import { GeneralOptions } from '../../models/brb/general-options.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
  providers: [MessageService]
})
export class ResultComponent implements OnInit, OnDestroy {
  private errorSubs!: Subscription;
  chainingData!: GeneralOptions;
  date: Date = new Date();
  result_id: string = 'abcd-1111-abcdef-0000-abcd';
  username: string = 'gama';

  constructor(private chainingDataService: ChainingDataService, private frameService: FrameService,
              private messageService: MessageService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.chainingData = this.chainingDataService.chainingData;
    this.errorSubs = this.chainingDataService.error.subscribe(failure => this.alertService.warn(this.messageService, failure.data));
  }

  goHome = () => this.frameService.goto('home', true);

  printResult() {
    if (environment.mobile) {
      //this.alertService.info(this.messageService, 'Guardando imagen', 'del resultado!');
      this.alertService.warn(this.messageService, 'Caracteristica en pruebas!');
      // @ts-ignore cordova saveResultPic(fileName)
      app.saveResultPic('fileName');
    } else window.print();
  }

  ngOnDestroy(): void {
    if (this.errorSubs) this.errorSubs.unsubscribe();
  }
}
