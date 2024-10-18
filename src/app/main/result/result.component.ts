import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isResolved: boolean = false;

  constructor(private chainingDataService: ChainingDataService, private frameService: FrameService,
              private messageService: MessageService, private alertService: AlertService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isResolvedData();
    this.errorSubs = this.chainingDataService.error.subscribe(failure => this.alertService.warn(this.messageService, failure.data));
  }

  private isResolvedData() {
    const resolvedData = this.route.snapshot.data['resultResolver'];
    this.resultResponse = resolvedData ? resolvedData : this.chainingDataService.resultData;
    if (resolvedData) {
      this.isResolved = true;
      document.title = 'DiagnoCom - ' + this.resultResponse.resultId;
      document.getElementById('result')!.classList.add('result-id');
      document.getElementById('result')!.classList.add(this.resultResponse.content['localizacion'].value + '-bg');
    }
  }

  goHome() {
    if (this.isResolved) this.frameService.goto('disclaimer');
    else this.frameService.goto('home', true);
  }

  printResult() {
    if (environment.mobile) {
      this.toggleSaveView();
      this.alertService.warn(this.messageService, 'en pruebas!');
    } else window.print();
  }

  private toggleSaveView() {
    if (!this.isResolved) {
      document.getElementsByClassName('main-header').item(0)!.classList.add('hidden');
      document.getElementsByClassName('result-controls').item(0)!.classList.add('hidden');
    }
  }

  ngOnDestroy(): void {
    if (this.errorSubs) this.errorSubs.unsubscribe();
  }
}
