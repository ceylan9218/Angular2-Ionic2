//import {Injectable} from 'angular2/core';
//import {Http} from 'angular2/http';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

let apiRootUrl = '/api';

@Injectable()
export class ProgressService {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
    
    this.progress = http.get(apiRootUrl+'/progress', { withCredentials: true })
      .map(response => response.json())
      .catch(this.handleError);
  }
  
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
