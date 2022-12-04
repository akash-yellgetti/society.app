import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as _ from  'lodash';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public config: any = {
    baseUrl: 'http://api.dicezen.com'
    // baseUrl: 'http://api.society.uat'
  };
  public _observableEmitter: any = {};

  constructor(private toastr: ToastrService, private storageService: StorageService) {}

  getEmitter = (key: string): any => {
    if (key) {
      this._observableEmitter[key] = new EventEmitter();
      return this._observableEmitter[key];
    }
  }
  emitImageData = (key: string, data: any): any => {
    if (this._observableEmitter[key]) {
      this._observableEmitter[key].emit(data);
    }
  }

  handleError = (error: any, message: any): any => {
    const err: any = _.get(error,"error");
    const msg: string = _.get(err,"message");
    switch (error.status) {
      case 401:
      case 422:
      this.toastr.error(msg);
      const errs = err.data;
        for (const key in errs) {
          const e: any = errs[key];
          for (const msg of e) {
            console.log(msg);
            this.toastr.error(msg);
          }
        }
        break;
    }
    return throwError(err.msg || 'Server error');
  }

  getToken = () => {
    return this.storageService.get('token');
  }
}
