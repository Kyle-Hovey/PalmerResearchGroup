import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Palmer } from './palmer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PalmerService {
  private latLonUrl = '/api/'
  
  palmer = Palmer;

  constructor(private http: Http) { }

  getPalmer() {
	return this.http.get(this.riskUrl)
	}
  
  getRiskFromLatLon(lat, lon): Promise<void | Palmer[]> {
    return this.http.get(this.latLonUrl + lat + '-' + lon)
      .toPromise()
      .then(response => response.json() as Palmer[])
      .catch(this.handleError);
  }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
