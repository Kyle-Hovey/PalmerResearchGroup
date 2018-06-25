import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';


export interface UserDetails {
	_id: string;
	username: string;
	exp: number;
	iat: number;
}

interface TokenResponse{
	token: string;
}

export interface TokenPayload {
	username: string;
	password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
  	window.localStorage.setItem('mean-token', token);
  	this.token = token;
  }

  private getToken(): string {
  	if (!this.token) {
  	 this.token = window.localStorage.getItem('mean-token');
     console.log(this.token);
  	}
  	return this.token;
  }

  public logout(): void {
  	this.token = '';
  	window.localStorage.removeItem('mean-token');
  	this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
  	console.log('Getting User Details');
    const token = this.getToken();
  	let payload;
  	if (token) {
      console.log(token);
  		payload = token.split('.')[1];
  		payload = window.atob(payload);
  		return JSON.parse(payload);
  	} else {
  		return null;
  	}
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'create', user?: TokenPayload): Observable<any> {
  	let base;

  	if (method === 'post') {
  	  base = this.http.post(`/api/${type}`, user);
  	} else {
      console.log({headers: {Authorization: `Bearer ${this.getToken()}`}});
  	  base = this.http.get(`/api/${type}`, {headers: {Authorization: `Bearer ${this.getToken()}`}});
  	}

  	const request = base.pipe(
  	  map((data: TokenResponse) => {
  	  	if (data.token) {
          console.log('Saving token');
  	  	  this.saveToken(data.token);
  	  	}
        console.log(data);
  	  	return data;
  	  })
  	);

  	return request;
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public create(): Observable<any> {
    return this.request('get', 'create');
  }
}
