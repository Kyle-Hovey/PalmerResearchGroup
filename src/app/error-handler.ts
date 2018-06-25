import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class ErrorHandler { 
	constructor(private router : Router) { }

	public handleError(err: any) {
		console.log(err);
		
	}
}