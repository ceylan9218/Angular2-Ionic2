//import {Injectable} from 'angular2/core';
//import {Http} from 'angular2/http';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

let apiRootUrl = '/api';

@Injectable()
export class AuthenticateService {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
  }

  findAll() {
    return this.data;
  }

  authenticate() {
    let body = JSON.stringify({});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(apiRootUrl+'/authenticate', body, options)
        .map(res => res.json())
        .catch(this.handleError);
  }

  clearAuth() {
    let body = JSON.stringify({reset: true});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(apiRootUrl+'/authenticate', body, options)
        .map(res => res.json())
        .catch(this.handleError);
  }
  
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
