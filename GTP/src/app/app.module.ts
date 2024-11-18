import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { ViewComponent } from './dashboard/view/view.component';
import { DashboardModule } from './dashboard/dashboard.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,AuthenticationModule,DashboardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
