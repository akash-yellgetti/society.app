import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../http.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  getForm(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/admin/common/form';

    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };
    const params = JSON.stringify(body);

    return this.http.post(url, params, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.update')));
  }

  autoComplete(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/admin/form/auto-complete';

    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };
    const params = JSON.stringify(body);

    return this.http.post(url, params, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.update')));
  }

  detail(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/admin/common/detail';

    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };
    const params = JSON.stringify(body);

    return this.http.post(url, params, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.update')));
  }

  

  

  datatable(body: any): Observable<any> {

    const isObj = (a) => {
      if ((!!a) && (a.constructor === Object)) {
        return true;
      }
      return false;
    }
  
    const _st = (z, g) => {
      return "" + (g != "" ? "[" : "") + z + (g != "" ? "]" : "");
    };
  
    const fromObject = (params, skipobjects?: any, prefix?: any) => {
      if (skipobjects === void 0) {
        skipobjects = false;
      }
      if (prefix === void 0) {
        prefix = "";
      }
      var result = "";
      if (typeof(params) != "object") {
        return prefix + "=" + encodeURIComponent(params) + "&";
      }
      for (var param in params) {
        var c = "" + prefix + _st(param, prefix);
        if (isObj(params[param]) && !skipobjects) {
          result += fromObject(params[param], false, "" + c);
        } else if (Array.isArray(params[param]) && !skipobjects) {
          _.forEach(params[param], function(item, ind) {
            if (item) {
              result += fromObject(item, false, c + "[" + ind + "]");  
            }
          });
        } else {
          result += c + "=" + encodeURIComponent(params[param]) + "&";
        }
      }
      return result;
    };

    const url = this.httpService.config.baseUrl+ '/admin/common/datatable';
    
    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const options = { headers: headers };
    const params = fromObject(body);

    return this.http.post(url, params, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.update')));
  }

  list(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/admin/common/datatable';

    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };
    const params = JSON.stringify(body);

    return this.http.post(url, params, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.update')));
  }

  filePost(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/admin/common/create';

    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      // 'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
      // 'Content-Type': undefined
    });

    const options = { headers: headers };
    // const params = JSON.stringify(body);

    return this.http.post(url, body, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.update')));
  }

  create(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/admin/common/create';

    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };
    const params = JSON.stringify(body);

    return this.http.post(url, params, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.update')));
  }

  update(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/admin/common/update';

    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };
    const params = JSON.stringify(body);

    return this.http.post(url, params, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.update')));
  }

  delete(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/admin/common/delete';

    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };
    const params = JSON.stringify(body);

    return this.http.post(url, params, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.delete')));
  }
}
