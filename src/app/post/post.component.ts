import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor(private blogService: BlogService,
  	private route: ActivatedRoute) { }

  ngOnInit() {
  	this.getPost();
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
}
