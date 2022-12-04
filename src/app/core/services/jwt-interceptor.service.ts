import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const user = this.storage.get('user');
    const token = this.storage.get('token');
    

    if (token && _.isEmpty(token)) {
      request = request.clone({
        setHeaders: {
          authorization: token
        }
      });
    }

    // if (request.url !== this.storage.get('getIpUrl') && (hasStorage && !request.url.includes(this.storage.get('cmsMediaObjectUrl')))) {
    //   request = request.clone({
    //     setHeaders: {
    //       'api-build-version': this.appConfig && this.appConfig.config && this.appConfig.config.apiBuildVersion ? this.appConfig.config.apiBuildVersion : '1.0.0'
    //     }
    //   });
    // }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // if (event instanceof HttpResponse) {
          // console.log('HttpResponse event--->>>', event);
        // }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          // console.log('HttpErrorResponse event--->>>', error);
          if (error.status === 401) {
            this.storage.delete('user');
            this.storage.delete('token');
            window.location.href = '';
          }
        }

        return throwError(error.error);
      })
    );
  }
}
