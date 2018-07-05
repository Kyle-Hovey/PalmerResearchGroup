import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Post } from "../post";
import { BlogService } from "../blog.service";
import { Ng4TwitterTimelineService } from 'ng4-twitter-timeline/lib/index';

@Component({
    selector: 'app-homePage',
    templateUrl: './homePage.component.html',
    styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {

    constructor(private router: Router, private blogService: BlogService, private ng4TwitterTimelineService: Ng4TwitterTimelineService) { }

	newestPost: Post;

	ngOnInit() {
        this.getNewestPost();
    }

    getNewestPost() {
        this.blogService.getNewest()
        .subscribe((data:Post) => {
            if(!data) {
            	console.log("no posts")
            } else {
                console.log(data);
                this.newestPost = data;
            }
        });
    }

}