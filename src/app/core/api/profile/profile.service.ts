import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  menu(): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/admin/menu/user';
    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.get(url, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.menu')));
  }

  detail(): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/user/profile/detail';
    const headers = new HttpHeaders({
      'Authorization': this.httpService.getToken(),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.get(url, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.details')));
  }

  changePassword(body, token): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/user/profile/change-password';
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };
    const params = JSON.stringify(body);

    return this.http.post(url, params, options)
      .pipe(map((data) => data),
        catchError((err) => this.httpService.handleError(err, 'profile.changePassword')));
  }

  update(body: any): Observable<any> {
    const url = this.httpService.config.baseUrl+ '/user/profile/update';

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
