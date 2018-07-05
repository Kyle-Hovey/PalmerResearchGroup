import { Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent {

    constructor(private location: Location) { }
}