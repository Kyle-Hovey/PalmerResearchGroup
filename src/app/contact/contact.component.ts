import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Email } from '../email';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})

export class ContactComponent implements OnInit {
	
	private mailUrl = '/api/sendmail';
	
    constructor(private http: Http, private router: Router) { }
	
	ngOnInit() {
	}
	
	model = new Email("","","","")
	
	submitted = false;
	
	sendEmail() {
		let formData = new FormData();
		this.http.post(this.mailUrl, this.model).map((res:Response) => res).subscribe()
		this.submitted = true;
		setTimeout(() => 
		{
			this.router.navigate(['']);
		},
		5000);
	}
}