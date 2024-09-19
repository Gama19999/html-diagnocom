import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { MessageResponse } from '../models/message-response.model';
import { UserData } from '../models/user-data.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private user: UserData = new UserData();
  userData: BehaviorSubject<UserData> = new BehaviorSubject(this.user);

  constructor(private http: HttpClient) {}

  loadUserData() {
    this.http.get<MessageResponse>(environment.api + 'user').subscribe({
      next: success => this.handleSuccess(success),
      error: failure => this.handleError(failure)
    });
  }

  private handleSuccess(messageResponse: MessageResponse) {
    let data = messageResponse.data;
    this.user.username = data.username;
    this.user.email = data.email;
    this.user.lastActivity = new Date(data.lastActivity);
    this.user.error = '';
    this.userData.next(this.user);
  }

  private handleError(failure: any) {
    console.log(failure);
    this.user.error = failure.error.data;
    this.userData.next(this.user);
  }

  updateUserData(data: any) {
    this.http.post<MessageResponse>(environment.api + 'user', {'object': data}).subscribe({
      next: success => this.handleSuccess(success),
      error: failure => this.handleError(failure)
    })
  }
}
