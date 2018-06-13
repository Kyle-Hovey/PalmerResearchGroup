import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Http, Response } from '@angular/http'; 

var _this = this;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})

export class ContactComponent{
	private riskUrl = '/api/';
	
    constructor(private http: HttpClient) { }
	
	data = 'none';
	
	sendEmail() {
		this.http.post(this.riskUrl + 'send-email', this.data);
	}
}