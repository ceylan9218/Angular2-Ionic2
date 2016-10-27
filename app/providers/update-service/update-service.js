import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

let apiRootUrl = '/api';


@Injectable()
export class UpdateService {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    // make HTTP accessible within service
    this.http = http;
  }

  // look up a specified Concern, if it exists
  // HTTP verb: POST
  lookupLastFollowupByTipID(data) {
    // convert data object into JSON string for transmit
    let body = JSON.stringify(data);
    // set Content-Type header to match API requirement
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    
    // perform POST action and return response data (parsed as JSON)
    return this.http.post(apiRootUrl+'/lookup-concern', body, options)
        .map(res => res.json())
        .catch(this.handleError);
  }
  
  // create a new user followup Response
  // HTTP verb: POST
  createUserFollowupResponse(data) {
    // convert data object into JSON string for transmit
    let body = JSON.stringify(data);
    // set Content-Type header to match API requirement
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    
    // perform POST action and return response data (parsed as JSON)
    return this.http.post(apiRootUrl+'/update-concern', body, options)
        .map(res => res.json())
        .catch(this.handleError);
  }
  
  // error handler
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
