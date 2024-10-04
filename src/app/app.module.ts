import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module'
import { authInterceptor } from './rules/auth.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './login/form/form.component';
import { MainComponent } from './main/main.component';
import { DisclaimerComponent } from './main/disclaimer/disclaimer.component';
import { HomeComponent } from './main/home/home.component';
import { Se1fComponent } from './main/se1f/se1f.component';
import { Se2fComponent } from './main/se2f/se2f.component';
import { Se3fComponent } from './main/se3f/se3f.component';
import { ResultComponent } from './main/result/result.component';
import { SettingsComponent } from './main/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormComponent,
    MainComponent,
    DisclaimerComponent,
    HomeComponent,
    Se1fComponent,
    Se2fComponent,
    Se3fComponent,
    ResultComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule,
    InputSwitchModule,
    ConfirmDialogModule,
    DialogModule,
    SliderModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
