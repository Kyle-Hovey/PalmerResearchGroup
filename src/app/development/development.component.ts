import { Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
    selector: 'app-development',
    templateUrl: './development.component.html',
    styleUrls: ['./development.component.css']
})
export class DevelopmentComponent {

    constructor(private location: Location) { }
}