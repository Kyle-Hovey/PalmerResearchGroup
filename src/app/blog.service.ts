import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Palmer } from './palmer';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogUrl = '/api/blog/';
  private postUrl = '/api/post/';

  constructor(private http: HttpClient) { }

  getBlogPosts(num) {
	return this.http.get(this.blogUrl + num);
	}

  getPost(id) {
  	return this.http.get(this.postUrl + id);
  }
  
  private handleError (error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}