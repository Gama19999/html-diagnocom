import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './rules/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DisclaimerComponent } from './main/disclaimer/disclaimer.component';
import { HomeComponent } from './main/home/home.component';
import { Se1fComponent } from './main/se1f/se1f.component';
import { Se2fComponent } from './main/se2f/se2f.component';
import { Se3fComponent } from './main/se3f/se3f.component';
import { ResultComponent } from './main/result/result.component';
import { SettingsComponent } from './main/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [authGuard],
      children: [
        { path: 'disclaimer', component: DisclaimerComponent },
        { path: 'home', component: HomeComponent },
        { path: 'se1f', component: Se1fComponent },
        { path: 'se2f', component: Se2fComponent },
        { path: 'se3f', component: Se3fComponent },
        { path: 'result', component: ResultComponent },
        { path: 'settings', component: SettingsComponent }
      ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
