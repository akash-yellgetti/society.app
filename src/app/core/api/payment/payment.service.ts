import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public http: HttpClient, public httpService: HttpService) { }

  initiated(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/payment/initiated';

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

  info(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/payment';

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
}
