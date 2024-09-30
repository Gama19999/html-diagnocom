import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FrameService } from '../../services/frame.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private userDataSubs!: Subscription;
  username!: string;
  lastActivity!: Date;

  constructor(private frameService: FrameService, private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.userService.loadUserData();
    this.userDataSubs = this.userService.userData.subscribe(user => {
      this.username = user.username;
      this.lastActivity = user.lastActivity;
    });
  }

  startDiagnoCom = () => this.frameService.goto('se1f');

  goToSettings = () => this.frameService.goto('settings');

  exit = () => this.authService.logout();

  ngOnDestroy() {
    if(this.userDataSubs) this.userDataSubs.unsubscribe();
  }
}
