import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading: Boolean = false;
  public emitterKeys = [
    'mainHeader'
  ];
  public _observableEmitter: any = {};
  constructor(private router: Router) {
    this.loadObservableEmitter();
  }

  loadObservableEmitter = () => {
    _.each(this.emitterKeys, (key) => {
      this._observableEmitter[key] = new EventEmitter();
    })
  }

  generateBreadCrumbs = (url: string) => {
    return _.reject(_.reduce(_.split(url, '/'), (arr, key) => {
      arr.push({
        key,
        label: _.replace(_.startCase(_.camelCase(key)), / /g, ' ')
      })
      return arr;
    }, []), (res) => res && !res.key)
  }

  emitData(key: string, opts: any): any {
    if (this._observableEmitter[key]) {
      this._observableEmitter[key].emit(opts);
    }
  }

  getEmitter(key: string): Observable<any> {
    if (key) {
      this._observableEmitter[key] = new EventEmitter();
      return this._observableEmitter[key];
    }
  }
}
