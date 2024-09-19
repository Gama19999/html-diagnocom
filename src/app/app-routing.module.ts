import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './rules/auth.guard';
import { userDataResolver } from './rules/user-data.resolver';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DisclaimerComponent } from './main/disclaimer/disclaimer.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [authGuard], resolve: [userDataResolver], children:
      [
        { path: 'disclaimer', component: DisclaimerComponent }
      ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
