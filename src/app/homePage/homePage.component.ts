import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-homePage',
    templateUrl: './homePage.component.html',
    styleUrls: ['./homePage.component.css']
})
export class HomePageComponent {

    constructor(private router: Router) { }

}