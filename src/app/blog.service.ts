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
  private editUrl = '/api/edit/';
  private postUrl = '/api/post/';
  private deleteUrl = '/api/deletePost/';
  private deletePhotoUrl = '/api/delete/';
  private uploadUrl = '/api/upload';
  private createUrl = '/api/blogpost';
  private editPostUrl = '/api/editpost';

  constructor(private http: HttpClient) { }

  getBlogPosts(num) {
	  return this.http.get(this.blogUrl + num);
	}

  getPostForEditing(id){
    return this.http.get(this.editUrl + id);
  }

  getPost(id) {
  	return this.http.get(this.postUrl + id);
  }

  createPost(post) {
    return this.http.post(this.createUrl, post);
  }

  editPost(post) {
    return this.http.post(this.editPostUrl, post);
  }
  
  deletePost(id) {
    return this.http.get(this.deleteUrl + id);
  }

  deletePhoto(photo, id, model) {
    return this.http.post(this.deletePhotoUrl + photo + '/' + id, model);
  }

  uploadPhoto(formData) {
    return this.http.post(this.uploadUrl, formData);
  }

  private handleError (error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}