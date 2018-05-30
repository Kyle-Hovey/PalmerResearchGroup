import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
 
import { AppComponent } from './app.component';
import { PalmerComponent } from './palmer/palmer.component';
import { RiskComponent } from './risk/risk.component';
import { HttpClientModule } from '@angular/common/http';
import { PalmerService } from './palmer.service';

@NgModule({
  declarations: [
    AppComponent,
    PalmerComponent,
    RiskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    PalmerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }