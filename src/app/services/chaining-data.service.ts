import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { MessageResponse } from '../models/message-response.model';
import { GeneralOptions } from '../models/brb/general-options.model';
import { OptVariable } from '../models/brb/opt-variable.model';
import { ResultResponse } from '../models/brb/result-response.model';

@Injectable({ providedIn: 'root' })
export class ChainingDataService {
  public optValues: { [key: string]: OptVariable } = {};
  public chainingData: GeneralOptions = {};
  public resultData: ResultResponse = {resultId: '', username: '', content: {}, resultDate: new Date()};
  public success: Subject<GeneralOptions> = new Subject();
  public final: Subject<ResultResponse> = new Subject();
  public error: Subject<MessageResponse> = new Subject();

  private generals = ['temperatura', 'grados', 'localizacion', 'enfermedad'];

  constructor(private http: HttpClient) {}

  doForwardChain(data: any) {
    this.http.post<MessageResponse>(environment.api + 'brb/forward', {'object': data}).subscribe({
      next: response => {
        if (response.status === 200) this.handleResponse(response.data);
        else if (response.status === 201) this.handleResult(response.data);
      },
      error: failure => this.handleFailure(failure)
    });
  }

  private handleResponse(genOpts: GeneralOptions) {
    for (let opt in genOpts) {
      if (this.generals.includes(opt)) this.chainingData[opt] = genOpts[opt];
      else this.optValues[opt] = genOpts[opt];
    }
    this.optValues['grados'] = genOpts['grados'];
    this.success.next(this.chainingData);
  }

  handleResult(resultRes: ResultResponse) {
    this.resultData = resultRes;
    this.final.next(this.resultData);
  }

  handleFailure(failure: any) {
    console.log(failure);
    this.error.next(failure.error);
  }

  reset() {
    this.optValues = {};
    this.chainingData = {};
    this.resultData = {resultId: '', username: '', content: {}, resultDate: new Date()};
  }
}
