import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomePageComponent } from './homePage/homePage.component';
import { TeamComponent } from './team/team.component';
import { PalmerComponent } from './palmer/palmer.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'team', component: TeamComponent },
	{ path: 'palmer', component: PalmerComponent},
	{ path: 'blog', component: BlogComponent},
	{ path: 'contact', component: ContactComponent},
	{ path: 'create', component: CreateComponent}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule { }