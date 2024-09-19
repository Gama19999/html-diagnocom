import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FrameService } from '../../services/frame.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Se1fComponent } from '../se1f/se1f.component';
import { SettingsComponent } from '../settings/settings.component';

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
    this.userDataSubs = this.userService.userData.subscribe(user => {
      this.username = user.username;
      this.lastActivity = user.lastActivity;
    });
  }

  startDiagnoCom = () => this.frameService.frame.next(Se1fComponent);

  goToSettings = () => this.frameService.frame.next(SettingsComponent);

  exit = () => this.authService.logout();

  ngOnDestroy() {
    if(this.userDataSubs) this.userDataSubs.unsubscribe();
  }
}
