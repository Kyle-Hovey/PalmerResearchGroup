import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  posts: Post[];

  post: Post;

  noPosts = false;

  noMorePosts = false;

  cursor = 0;

  ngOnInit() {
    this.getBlogPosts(this.cursor);
    this.getPost();
  }

  getBlogPosts(num) {
    this.blogService.getBlogPosts(num)
    .subscribe((data: Post[]) => {
      if(!data || data.length == 0){
        console.log("no data");
        this.noPosts = true;
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

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.blogService.getPost(id)
      .subscribe((data : Post) => {
      this.post = data;
      console.log(this.post);
      });
  }

  changePost(id): void {
    console.log(id)
    this.blogService.getPost(id)
      .subscribe((data : Post) => {
      this.post = data;
      console.log(this.post);
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