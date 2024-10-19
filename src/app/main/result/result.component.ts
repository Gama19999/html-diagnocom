import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import domtoimage from 'dom-to-image';

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
  isMobile: boolean = environment.mobile;

  constructor(private chainingDataService: ChainingDataService, private frameService: FrameService,
              private messageService: MessageService, private alertService: AlertService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.checkForResolvedData();
    this.resultResponse = this.isResolved ? this.resultResponse : this.chainingDataService.resultData;
    this.errorSubs = this.chainingDataService.error.subscribe(failure => this.alertService.warn(this.messageService, failure.data));
  }

  private checkForResolvedData() {
    this.resultResponse = this.route.snapshot.data['resultResolver'];
    this.isResolved = !!this.resultResponse;
    if (this.isResolved) {
      document.getElementById('result')!.classList.add('result-id');
      document.getElementById('result')!.classList.add(this.resultResponse.content['localizacion'].value + '-bg');
    }
  }

  goHome() {
    if (this.isResolved) this.frameService.goto('disclaimer');
    else this.frameService.goto('home', true);
  }

  private toggleSaveTitle(extension: string) {
    document.title = `DiagnoCom-${this.resultResponse.resultId}.${extension}`;
    this.alertService.notificationSound();
  }

  saveAsPDF() {
    this.toggleSaveTitle('pdf');
    window.print();
  }

  saveAsPicture() {
    let flagMobile = this.isMobile;
    this.toggleSaveTitle('png');
    this.fixBackground();
    domtoimage.toPng(this.isResolved ? document.getElementById('result')! : document.getElementById('main')!)
      .then(function (dataURL) {
        // @ts-ignore cordova savePicture method
        if (flagMobile) app.savePicture(document.title, dataURL, 'image/png');
        else {
          const link = document.createElement('a');
          link.download = document.title;
          link.href = dataURL;
          link.click();
        }
      })
      .then(() => this.restoreBackground())
      .catch((error: any) => console.error('oops, something went wrong!\n', error));
  }

  private fixBackground() {
    if (!this.isResolved) document.getElementsByClassName('main-header').item(0)!.classList.add('hidden');
    document.getElementsByClassName('result-controls').item(0)!.classList.add('hidden');
  }

  private restoreBackground() {
    document.getElementsByClassName('result-controls').item(0)!.classList.remove('hidden');
    if (!this.isResolved) document.getElementsByClassName('main-header').item(0)!.classList.remove('hidden');
  }

  saveAsPictureCompleted(input: any) {
    let result = (<HTMLInputElement> input).value;
    this.alertService.success(this.messageService, result, document.title);
  }

  ngOnDestroy(): void {
    if (this.errorSubs) this.errorSubs.unsubscribe();
  }
}
