import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import {  provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { CommonModule } from '@angular/common';


import { AuthGuard } from './common/auth.guard.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { routes } from "app/app.routes";
import { SellComponent } from './sell/sell.component';
import { FiltersComponent } from './filters/filters.component';
import { CarpostsComponent } from './carposts/carposts.component';
import { PostblocksComponent } from './postblocks/postblocks.component';
import { RelatedadsComponent } from './relatedads/relatedads.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    SellComponent,
    FiltersComponent,
    CarpostsComponent,
    PostblocksComponent,
    RelatedadsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NguiAutoCompleteModule,
    RouterModule.forRoot(routes, {
      useHash: false
    }),
    
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { 
  	public pages = [
        {image: "../asset/logo.png"},
        {image: "../asset/heart-red.png"}
    ];
}
