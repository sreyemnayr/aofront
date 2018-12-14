import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map } from 'rxjs/operators';
import { UserService } from '@app/core/user.service';
import { NotificationService } from '@app/core';
import { ActionAuthLogin } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class AppflowService implements OnInit {
  public token = '';
  private httpOptions: any;
  appflows$: Observable<Array<any>>;
  public appflows: Array<any>;
  public editAppflow: any;

  constructor(
    private http: HttpClient,
    private _userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.setHeaders();
  }

  setHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this._userService.token
      })
    };
  }

  updateAppflow(model, transform = true) {
    let url = '/api/v1/appflow/';
    url += model.id + '/';
    const model_modified = model;
    this.setHeaders();

    return this.http.put(url, JSON.stringify(model_modified), this.httpOptions);
  }

  createAppflow(model, transform = true) {
    const url = '/api/v1/appflow/';
    const model_modified = model;
    this.setHeaders();

    return this.http.post(
      url,
      JSON.stringify(model_modified),
      this.httpOptions
    );
  }

  createOrUpdateAppflow(model, transform = true) {
    return model.id
      ? this.updateAppflow(model, transform)
      : this.createAppflow(model, transform);
  }

  getAppflows() {
    this.setHeaders();
    const url = '/api/v1/appflow/';

    return this.http
      .get(url, {
        headers: { Authorization: 'JWT ' + this._userService.token }
      })
      .pipe(map(res => res['results']));
  }

  getFamilies() {
    this.setHeaders();
    return this._userService.getFamilies(this.httpOptions);
  }

  getAppflow(id: string = '') {
    this.setHeaders();
    let url = '/api/v1/appflow/';
    if (id) {
      url += id + '/';
    }
    return this.http
      .get(url, {
        headers: { Authorization: 'JWT ' + this._userService.token }
      })
      .pipe(
        map(res => ({
          res
        }))
      );
  }
}
