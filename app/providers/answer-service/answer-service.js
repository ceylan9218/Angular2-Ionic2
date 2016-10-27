//import {Injectable} from 'angular2/core';
//import {Http} from 'angular2/http';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

let apiRootUrl = '/api';

@Injectable()
export class AnswerService {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
  }

  findAll() {
    return this.data;
  }

  addAnswer(params) {
    let body = JSON.stringify(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(apiRootUrl+'/add-answer', body, options)
        .map(res => res.json())
        .catch(this.handleError);
  }
  
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
