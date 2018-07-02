import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { AuthenticationService, UserDetails } from '../authentication.service';
import { BlogService } from '../blog.service';

import { Post } from '../post';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  NewPost = true;

  EditingPost = false;

  posts: Post[];

  noPosts = false;

  details: UserDetails;

  cursor = 0;

  noMorePosts = false;

  model = new Post("","","",null);

  submitted = false;
  
  edited = false;

  constructor(private el: ElementRef, private router: Router, private auth: AuthenticationService, private blogService: BlogService) { }

  ngOnInit() {
    this.auth.create()
    .subscribe((user) => {
      this.details = user;
      }, (err) => { console.error(err);},      
    () => console.log('yay'));

    this.getBlogPosts(this.cursor);
  };

  logout() {
    console.log('logout function');
    this.auth.logout();
    this.router.navigate(['login']);
  };

  submitNew() {
    this.model.date = new Date();
  	let inputE1: HTMLInputElement = this.el.nativeElement.querySelector('#photo');

  	console.log(inputE1);

  	let fileCount: number = inputE1.files.length;

  	let formData = new FormData();
  	
  	if (fileCount > 0) {

  		formData.append('photo', inputE1.files.item(0));

  		this.model.photo = inputE1.files.item(0).name;
  		
  		console.log(this.model);
  		
  		this.blogService.uploadPhoto(formData).map((res:Response) => res).subscribe();
  		this.blogService.createPost(this.model).map((res:Response)=> res).subscribe();
  	}

    this.getBlogPosts(this.cursor);

  	this.submitted = true;
  }

  submitEdit() {
    this.model.editedDate = new Date();
    console.log("editing: " + this.model);
    if (!this.model.photo) {
      let inputE1: HTMLInputElement = this.el.nativeElement.querySelector('#photo');

      let fileCount: number = inputE1.files.length;

      let formData = new FormData();
    
      if (fileCount > 0) {

        formData.append('photo', inputE1.files.item(0));

        this.model.photo = inputE1.files.item(0).name;
      
        console.log(this.model);
      
        this.blogService.uploadPhoto(formData).map((res:Response) => res).subscribe();
      }
    }

    this.blogService.editPost(this.model).map((res:Response)=> res).subscribe();
    
    this.getBlogPosts(this.cursor);

    this.edited = true;

  }

  getBlogPosts(num) {
      this.blogService.getBlogPosts(num)
      .subscribe((data: Post[]) => {
        if(!data || data.length == 0){
          console.log("no data");
          this.noPosts = true;
          this.noMorePosts = true;
        }
        else{
          console.log(data);
          this.posts = data;
          if (data.length < 5) {
            this.noMorePosts = true;
          } else {
            this.noMorePosts = false;
          }
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

    startEdit(str) {
      console.log('Editing Post:' + str);
      this.NewPost = false;
      this.EditingPost = true;
      this.submitted = false;
      this.edited = false;
      
      this.blogService.getPostForEditing(str)
      .subscribe((data : Post) => {
      this.model = data;
      console.log(this.model);
      });
    }

    deletePost(id) {
      if (confirm('This will delete the post for good. Are you sure you want to do this?')) {
        this.blogService.deletePost(id).subscribe();
        this.getBlogPosts(this.cursor);
        this.model = new Post("","","",null)
      }
    }

    deleteCurrentPhoto(photoPath, postId) {
      this.blogService.deletePhoto(photoPath, postId, this.model).subscribe();
      
      this.blogService.getPostForEditing(postId)
      .subscribe((data : Post) => {
      this.model = data;
      console.log(this.model);
      });
    }

    newPost() {
      this.model = new Post("","","",null);
      this.EditingPost = false;
      this.submitted = false;
      this.edited = false;
      this.NewPost = true;
    }
}
