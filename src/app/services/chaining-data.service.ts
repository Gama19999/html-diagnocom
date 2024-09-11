import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { MessageResponse } from '../models/message-response.model';
import { Fact } from '../models/fact.model';
import { Options } from '../models/options.model';

@Injectable({ providedIn: 'root' })
export class ChainingDataService {
  private _knowledge: Fact = new Fact();
  private _options: Options = {};

  public knowledge: BehaviorSubject<Fact> = new BehaviorSubject(this._knowledge);
  public options: BehaviorSubject<Options> = new BehaviorSubject({});
  public lastError: Subject<MessageResponse> = new Subject();

  constructor(private http: HttpClient) {}

  doForwardChain(data: any) {
    this.http.post<MessageResponse>(environment.api + 'forward', {'choices': data}).subscribe({
      next: response => this.handleResponse(response),
      error: failure => { console.log(failure); this.lastError.next(failure.error); }
    });
  }

  private handleResponse(response: MessageResponse) {
    this._knowledge.afeccion = response.data[0].afeccion;
    this._knowledge.enfermedad = response.data[0].enfermedad;
    if (response.data[1]) {
      this._options = response.data[1];
      this.options.next(JSON.parse(JSON.stringify(this._options)));
    }
    this.knowledge.next(this._knowledge);
  }

  reset(afeccion: string = '') {
    this._knowledge.afeccion = afeccion;
    this._knowledge.enfermedad = '';
    this.knowledge.next(this._knowledge);
    this.options.next(JSON.parse(JSON.stringify(this._options)));
  }
}
