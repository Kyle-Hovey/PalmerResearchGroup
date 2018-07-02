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

    newestPost: Post;

    noPosts = false;

    noMorePosts = false;

    cursor = 0;

    ngOnInit() {
    	this.getBlogPosts(this.cursor);
        this.getNewestPost();
    }

    getBlogPosts(num) {
    	this.blogService.getBlogPosts(num)
    	.subscribe((data: Post[]) => {
    		if(!data || data.length == 0){
    			console.log("no data");
    			this.noPosts = true;
                console.log(this.noPosts)
    		}
    		else{
                if (data.length < 5) {
                    this.noMorePosts = true;
                } else {
                    this.noMorePosts = false;
                }
    			console.log("data");
    			this.posts = data;
                this.noPosts = false;
    			console.log(this.posts);
    		}
    	});
    }

    getNewestPost() {
        this.blogService.getNewest()
        .subscribe((data:Post) => {
            if(!data) {
                this.noPosts = true;
            } else {
                console.log(data);
                this.newestPost = data;
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