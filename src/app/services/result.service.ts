import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';
import { MessageResponse } from '../models/message-response.model';

@Injectable({ providedIn: 'root' })
export class ResultService {

  constructor(private http: HttpClient) {}

  getResult(resultId: string) {
    return this.http.get<MessageResponse>(environment.api + 'results/' + resultId).pipe(map(mr => mr.data));
  }
}
