import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  createTemplate(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/maintenance/template/create';

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

  updateTemplate(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/maintenance/template/update';

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

  createGenerate(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/maintenance/generate/create';

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

  updateGenerate(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/maintenance/generate/update';

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


  templateChargesMaster(): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/maintenance/template/charges/master';
    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.get(url, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.menu')));
  }

  templateCharges(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/maintenance/template/charges';

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
