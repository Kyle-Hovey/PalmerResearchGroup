import { HomePageComponent } from './homePage/homePage.component';
import { TeamComponent } from './team/team.component';
import { PalmerComponent } from './palmer/palmer.component';
import { DevelopmentComponent } from './development/development.component';
import { ContactComponent } from './contact/contact.component';

export const AppRoutes: any = [
    { path: "", component: HomePageComponent },
    { path: "team", component: TeamComponent },
	{ path: "palmer", component: PalmerComponent},
	{ path: "development", component: DevelopmentComponent},
	{ path: "contact", component: ContactComponent}
];

export const AppComponents: any = [
    HomePageComponent,
    TeamComponent,
	PalmerComponent,
	DevelopmentComponent,
	ContactComponent
];