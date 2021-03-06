import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';

import { ErrorHandler} from './error-handler';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {
  
  constructor( public errorHandler : ErrorHandler ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler):     Observable<HttpEvent<any>> {
    // If the call fails, retry until 5 times before throwing an error
    return next.handle(request).do((event: HttpEvent<any>) => {}, (err: any) => {
    	if (err instanceof HttpErrorResponse) {
    		this.errorHandler.handleError(err);
    	}
    });
  }
}