import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
import { FrameService } from '../../services/frame.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService]
})
export class HomeComponent implements OnInit, OnDestroy {
  private userDataSubs!: Subscription;
  mobile: boolean = environment.mobile;
  username!: string;
  lastActivity!: Date;

  constructor(private frameService: FrameService, private userService: UserService, private authService: AuthService,
              private messageService: MessageService, private alertService: AlertService) {}

  ngOnInit() {
    this.userService.loadUserData();
    this.userDataSubs = this.userService.userData.subscribe(user => {
      this.username = user.username;
      this.lastActivity = user.lastActivity;
    });
  }

  startDiagnoCom = () => this.frameService.goto('se1f');

  goToResults = () => this.alertService.warn(this.messageService, 'función desactivada!');

  goToSettings = () => this.frameService.goto('settings');

  exit = () => this.authService.logout();

  ngOnDestroy() {
    if(this.userDataSubs) this.userDataSubs.unsubscribe();
  }
}
