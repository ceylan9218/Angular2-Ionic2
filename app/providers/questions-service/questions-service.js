//import {Injectable} from 'angular2/core';
//import {Http} from 'angular2/http';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

let apiRootUrl = '/api';

@Injectable()
export class QuestionsService {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;

    this.topicList = http.get(apiRootUrl+'/topic-list', { withCredentials: true })
      .map(response => response.json())
      .catch(this.handleError);

    this.issueList = http.get(apiRootUrl+'/issue-list', { withCredentials: true })
      .map(response => response.json())
      .catch(this.handleError);

    this.nextQuestion = http.get(apiRootUrl+'/next-question', { withCredentials: true })
      .map(response => {
            // add HTTP status code to response
            let resp = response.json();
            resp['httpStatus'] = response.status;
            return resp;
        })
      .catch(this.handleError);

    this.prevQuestion = http.get(apiRootUrl+'/prev-question', { withCredentials: true })
      .map(response => {
            // add HTTP status code to response
            let resp = response.json();
            resp['httpStatus'] = response.status;
            return resp;
        })
      .catch(this.handleError);
  }

  findAll() {
    return this.data;
  }
 
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
