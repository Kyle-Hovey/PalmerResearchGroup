import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";

import { PalmerService } from './palmer.service';

import { AppComponent } from './app.component';
import { HomePageComponent } from './homePage/homePage.component';
import { TeamComponent } from './team/team.component';
import { PalmerComponent } from './palmer/palmer.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { DevelopmentComponent } from './development/development.component';
import { ContactComponent } from './contact/contact.component';
import { RiskComponent } from './risk/risk.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TeamComponent,
    PalmerComponent,
    GoogleMapComponent,
    DevelopmentComponent,
    ContactComponent,
    RiskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDKr6lrHj-ALXJoW7MI1g-Fm9CjSUqWEOY",
      libraries: ["places"]
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [
    PalmerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }