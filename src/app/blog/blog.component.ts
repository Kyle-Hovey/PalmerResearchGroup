import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { BlogService } from '../blog.service';
@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{

    constructor(private blogService: BlogService) { }

    posts: Post[];

    noposts = false;

    selectedPost: Post;

    cursor = 0;

    ngOnInit() {
    	this.getBlogPosts(this.cursor);
    }

    getBlogPosts(num) {
    	this.blogService.getBlogPosts(num)
    	.subscribe((data: Post[]) => {
    		if(!data){
    			console.log("no data");
    			this.noposts = true;
    		}
    		else{
    			console.log("data");
    			this.posts = data;
    			console.log(this.posts);
    		}
    	});
    }
}