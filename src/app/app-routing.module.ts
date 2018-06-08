import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomePageComponent } from './homePage/homePage.component';
import { TeamComponent } from './team/team.component';
import { PalmerComponent } from './palmer/palmer.component';
import { DevelopmentComponent } from './development/development.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'team', component: TeamComponent },
	{ path: 'palmer', component: PalmerComponent},
	{ path: 'development', component: DevelopmentComponent},
	{ path: 'contact', component: ContactComponent}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule { }