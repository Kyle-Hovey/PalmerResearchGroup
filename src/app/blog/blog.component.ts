import { Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent {

    constructor(private location: Location) { }
}