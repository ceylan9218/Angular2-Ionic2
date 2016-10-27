//import {Injectable} from 'angular2/core';
//import {Http} from 'angular2/http';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

let apiRootUrl = '/api';

@Injectable()
export class ConcernService {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
  }

  findAll() {
    return this.data;
  }

  postConcern(data) {
    // convert data object into JSON string for transmit
    let body = JSON.stringify(data);
    // set Content-Type header to match API requirement
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    
    // perform POST action and return response data (parsed as JSON)
    return this.http.post(apiRootUrl+'/affiliation', body, options)
        .map(res => res.json())
        .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
