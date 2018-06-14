import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Post } from '../post';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  private blogUrl = '/api/blogpost';
  private uploadUrl = '/api/upload';
  
  constructor(private http: Http, private el: ElementRef) { }

  ngOnInit() {
  }

  model = new Post("","","");

  submitted = false;

  onSubmit() {
  	let inputE1: HTMLInputElement = this.el.nativeElement.querySelector('#photo');

  	console.log(inputE1);

  	let fileCount: number = inputE1.files.length;

  	let formData = new FormData();
  	
  	if (fileCount > 0) {

  		formData.append('photo', inputE1.files.item(0));

  		this.model.photo = inputE1.files.item(0).name;
  		
  		console.log(this.model);
  		
  		this.http.post(this.uploadUrl, formData).map((res:Response) => res).subscribe(
  			(success) => {
  				alert(success);
  			},
  			(error) => alert(error));
  		this.http.post(this.blogUrl, this.model).map((res:Response)=> res).subscribe(
  			(success) => {
  				alert(success);
  			},
  			(error) => alert(error));
  	}

  	this.submitted = true;
  }

}
