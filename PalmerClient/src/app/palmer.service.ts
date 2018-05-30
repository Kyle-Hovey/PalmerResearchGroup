import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Response } from '@angular/http';
import { Palmer } from './palmer';

import 'rxjs/add/operator/map';

@Injectable()
export class PalmerService {

  api_url = 'http://localhost:3000';
  riskUrl = `${this.api_url}/api/risk`;

  latLonUrl = `${this.api_url}/api/`;
  
  palmer = Palmer;

  constructor(private http: HttpClient) { }

  getPalmer() {
    return this.http.get(this.riskUrl);
  }

  getRiskFromLatLon(lat, lon) {
    return this.http.get(this.latLonUrl + lat + '-' + lon);
  }

  private handleError (error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
