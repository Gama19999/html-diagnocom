import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

import { api } from '../../enviroments/environment';
import { MessageResponse } from '../models/message-response.model';
import { Fact } from '../models/fact.model';
import { Options } from '../models/options.model';

@Injectable({ providedIn: 'root' })
export class ChainingDataService {
  private _knowledge: Fact = new Fact();
  public knowledge: Subject<Fact> = new Subject();
  public options: BehaviorSubject<Options> = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  get condition() { return this._knowledge.afeccion; }
  get illness() { return this._knowledge.enfermedad; }

  doForwardChain(data: any) {
    this.http.post<MessageResponse>(api + 'forward', {'choices': data}).subscribe({
      next: response => this.handleResponse(response),
      error: failure => console.log(failure)
    });
  }

  private handleResponse(response: MessageResponse) {
    this._knowledge.afeccion = response.data[0].afeccion ? response.data[0].afeccion : this._knowledge.afeccion;
    this._knowledge.enfermedad = response.data[0].enfermedad;
    this.options.next(response.data[1]);
    this.knowledge.next(this._knowledge);
  }
}
