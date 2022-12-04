import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  login(params: any): Observable<any> {
    return this.http.post(this.httpService.config.baseUrl+ '/auth/login', params)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'login-fail')));
  }

  request(params: any): Observable<any> {
    return this.http.post(this.httpService.config.baseUrl+ '/auth/request-otp', params)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'request-otp-fail')));
  }

  verify(params: any): Observable<any> {
    return this.http.post(this.httpService.config.baseUrl+ '/auth/verify-otp', params)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'verify-otp-fail')));
  }

  register(params: any): Observable<any> {
    return this.http.post(this.httpService.config.baseUrl+ '/auth/register', params)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'register-fail')));
  }
}
