import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";

import { PalmerService } from './palmer.service';

import { environment } from './../environments/environment';

import { AppComponent } from './app.component';
import { HomePageComponent } from './homePage/homePage.component';
import { TeamComponent } from './team/team.component';
import { PalmerComponent } from './palmer/palmer.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { RiskComponent } from './risk/risk.component';
import { CreateComponent } from './create/create.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';

import { ErrorHandler } from './error-handler';
import { ServerErrorsInterceptor } from './server-errors.interceptor';
import { Ng4TwitterTimelineModule } from 'ng4-twitter-timeline/lib/index';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TeamComponent,
    PalmerComponent,
    GoogleMapComponent,
    BlogComponent,
    ContactComponent,
    RiskComponent,
    CreateComponent,
    PostComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng4TwitterTimelineModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ["places"]
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    ErrorHandler,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    },
  ]
})
export class AppModule { }