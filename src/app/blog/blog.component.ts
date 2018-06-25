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

    noPosts = false;

    selectedPost: Post;

    cursor = 0;

    ngOnInit() {
    	this.getBlogPosts(this.cursor);
    }

    getBlogPosts(num) {
    	this.blogService.getBlogPosts(num)
    	.subscribe((data: Post[]) => {
    		if(!data || data.length == 0){
    			console.log("no data");
    			this.noPosts = true;
    		}
    		else{
    			console.log("data");
    			this.posts = data;
                this.noPosts = false;
    			console.log(this.posts);
    		}
    	});
    }

    getNewer() {
      this.cursor -= 5;
      this.getBlogPosts(this.cursor);
    }

    getOlder() {
      this.cursor += 5;
      this.getBlogPosts(this.cursor);
    }
}