import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './rules/auth.guard';
import { resultResolver } from './rules/result.resolver';
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
  { path: 'login', component: LoginComponent, title: 'DiagnoCom | Login' },
  { path: 'main', component: MainComponent, canActivate: [authGuard],
      children: [
        { path: 'disclaimer', component: DisclaimerComponent, title: 'DiagnoCom | Aviso' },
        { path: 'home', component: HomeComponent, title: 'DiagnoCom | Inicio' },
        { path: 'se1f', component: Se1fComponent, title: 'SE | Temperatura' },
        { path: 'se2f', component: Se2fComponent, title: 'SE | Localización' },
        { path: 'se3f', component: Se3fComponent, title: 'SE | Síntomas' },
        { path: 'se-result', component: ResultComponent, title: 'SE | Resultado' },
        { path: 'settings', component: SettingsComponent, title: 'DiagnoCom | Ajustes' }
      ]
  },
  { path: 'result/:id', component: ResultComponent, resolve: { resultResolver } },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'main/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
