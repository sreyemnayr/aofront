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
export class FamilyService implements OnInit {
  public token = '';
  private httpOptions: any;
  familys$: Observable<Array<any>>;
  public familys: Array<any>;
  public editFamily: any;

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

  getFields() {
    this.setHeaders();
    return this.http.options<FormlyFieldConfig[]>('/api/v1/familys/', {
      headers: { Authorization: 'JWT ' + this._userService.token }
    });
  }

  transformFamilyModel(model, update = false) {
    for (const v in model.parents) {
      if (model.parents[v].dob) {
        model.parents[v].dob = formatDate(
          model.parents[v].dob,
          'yyyy-MM-dd',
          'en-US'
        );
      }
    }
    // if (model.basic_info.address) {
    //   model.basic_info.address = {'raw': model.basic_info.address };
    // }

    if (!update) {
      return {
        parents: model.parents,
        ...model.basic_info
      };
    } else {
      return {
        parents: model.parents,
        ...model.basic_info
      };
    }
  }

  updateFamily(model) {
    let url = '/api/v1/applyonline/families/';
    url += model.id + '/';
    const model_modified = this.transformFamilyModel(model, true);
    this.setHeaders();

    return this.http.put(url, JSON.stringify(model_modified), this.httpOptions);
  }

  createFamily(model) {
    const url = '/api/v1/applyonline/familys/';
    const model_modified = this.transformFamilyModel(model);
    this.setHeaders();

    return this.http.post(
      url,
      JSON.stringify(model_modified),
      this.httpOptions
    );
  }

  createOrUpdateFamily(model) {
    return model.id ? this.updateFamily(model) : this.createFamily(model);
  }

  getFamilys() {
    this.setHeaders();
    const url = '/api/v1/applyonline/families/';

    return this.http
      .get(url, {
        headers: { Authorization: 'JWT ' + this._userService.token }
      })
      .pipe(map(res => res['results']));
  }

  getParents() {
    this.setHeaders();
    const url = '/api/v1/applyonline/families/';

    return this.http
      .get(url, {
        headers: { Authorization: 'JWT ' + this._userService.token }
      })
      .pipe(map(res => res['results'][0]['parents']));
  }

  getFamilies() {
    this.setHeaders();
    return this._userService.getFamilies(this.httpOptions);
  }

  getFamily(id: string = '') {
    this.setHeaders();
    let url = '/api/v1/applyonline/families/';
    if (id) {
      url += id + '/';
    }
    return this.http
      .get(url, {
        headers: { Authorization: 'JWT ' + this._userService.token }
      })
      .pipe(
        map(res => ({
          id: res['id'],
          basic_info: {
            name: res['name'],
            address_search: res['address'] ? res['address']['raw'] : '',
            address: res['address'],
            home_phone: res['home_phone'],
            connections: res['connections'],
            connections_more: res['connections_more']
          },
          parents: res['parents']
        }))
      );
  }
}
