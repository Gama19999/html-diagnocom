import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ChainingDataService } from '../../services/chaining-data.service';
import { FrameService } from '../../services/frame.service';
import { AlertService } from '../../services/alert.service';
import { ResultResponse } from '../../models/brb/result-response.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
  providers: [MessageService]
})
export class ResultComponent implements OnInit, OnDestroy {
  private errorSubs!: Subscription;
  resultResponse!: ResultResponse;

  constructor(private chainingDataService: ChainingDataService, private frameService: FrameService,
              private messageService: MessageService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.resultResponse = this.chainingDataService.resultData;
    this.errorSubs = this.chainingDataService.error.subscribe(failure => this.alertService.warn(this.messageService, failure.data));
  }

  goHome = () => this.frameService.goto('home', true);

  printResult() {
    if (environment.mobile) {
      this.toggleSaveView();
      // @ts-ignore cordova saveResultPic(fileName)
      app.saveResultPic('DiagnoCom - ' + this.resultResponse.resultId);
    } else window.print();
  }

  private toggleSaveView() {
    document.getElementsByClassName('main-header').item(0)!.classList.add('hidden');
    document.getElementsByClassName('result-controls').item(0)!.classList.add('hidden');
  }

  ngOnDestroy(): void {
    if (this.errorSubs) this.errorSubs.unsubscribe();
  }
}
