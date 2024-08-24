import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ChainLogic} from '../models/chain-logic.interface';

import {api} from '../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class ChainingService implements ChainLogic {
  private _facts: string[] = [];

  constructor(private http: HttpClient) { }

  get facts() {
    return this._facts.slice();
  }

  storeFact(fact: string): void {
    this._facts.push(fact);
  }

  doForwardChain(data: any): void {
    this.http.post(api + 'forward', {'choices': data}).subscribe({
      next: (response) => console.log(response),
      error: (response) => console.log(response)
    });
  }
}
