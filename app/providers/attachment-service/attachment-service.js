  //import {Injectable} from 'angular2/core';
//import {Http} from 'angular2/http';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

let apiRootUrl = '/api';

@Injectable()
export class AttachmentService {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
  }

  findAll() {
    return this.data;
  }

  addAttachment(params) {
    return Observable.fromPromise(new Promise((resolve, reject) => {
        let formData = new FormData();
        let xhr = new XMLHttpRequest();

        formData.append('attachment', params.attachment);
        formData.append('type', params.type);
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    reject(xhr.response)
                }
            }
        }
        xhr.open('POST', apiRootUrl+'/add-attachment', true);
        xhr.send(formData);
    }));
  }
  
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
