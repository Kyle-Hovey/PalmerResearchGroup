import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Palmer } from './palmer';

import 'rxjs/add/operator/map';

@Injectable()
export class PalmerService {
  private riskUrl = '/api/';

  constructor(private http: HttpClient) { }

  getPalmer() {
	return this.http.get(this.riskUrl);
	}
  
  getRiskFromLatLon(lat, lon) {
    return this.http.get(this.riskUrl + lat + '-' + lon);
  }

  private handleError (error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
