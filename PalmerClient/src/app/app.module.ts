import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
 
import { AppComponent } from './app.component';
import { PalmerComponent } from './palmer/palmer.component';
import { RiskComponent } from './risk/risk.component';
import { HttpClientModule } from '@angular/common/http';
import { PalmerService } from './palmer.service';
import { HomePageComponent } from './homePage/homePage.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { AppComponents, AppRoutes } from "./app.routing";
import { GoogleMapComponent } from './google-map/google-map.component';

@NgModule({
  declarations: [
    AppComponent,
    PalmerComponent,
    RiskComponent,
    ...AppComponents,
    GoogleMapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
	HttpModule,
    RouterModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    PalmerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }