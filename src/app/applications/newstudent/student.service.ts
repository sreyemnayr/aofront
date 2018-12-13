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
export class StudentService implements OnInit {
  public token = '';
  private httpOptions: any;
  students$: Observable<Array<any>>;
  public students: Array<any>;
  public editStudent: any;

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
    return this.http.options<FormlyFieldConfig[]>('/api/v1/students/', {
      headers: { Authorization: 'JWT ' + this._userService.token }
    });
  }

  transformStudentModel(model, update = false) {
    model.basic_info.dob = formatDate(
      model.basic_info.dob,
      'yyyy-MM-dd',
      'en-US'
    );
    if (!update) {
      const families = [];
      for (const family of model.families) {
        // families.push((update) ? {'id': family['id']} : {'id': family['id'], 'name': family['name']});
        families.push({ id: family['id'], name: family['name'] });
      }
      return {
        ...model.basic_info,
        id: model.id,
        families: families
      };
    } else {
      return {
        ...model.basic_info,
        id: model.id
      };
    }
  }

  updateStudent(model) {
    let url = '/api/v1/students/';
    url += model.id + '/';
    const model_modified = this.transformStudentModel(model, true);
    this.setHeaders();

    return this.http.put(url, JSON.stringify(model_modified), this.httpOptions);
  }

  createStudent(model) {
    const url = '/api/v1/applyonline/students/';
    const model_modified = this.transformStudentModel(model);
    this.setHeaders();

    return this.http.post(
      url,
      JSON.stringify(model_modified),
      this.httpOptions
    );
  }

  createOrUpdateStudent(model) {
    return model.id ? this.updateStudent(model) : this.createStudent(model);
  }

  getStudents() {
    this.setHeaders();
    const url = '/api/v1/applyonline/students/';

    const obj = this.http
      .get(url, {
        headers: { Authorization: 'JWT ' + this._userService.token }
      })
      .pipe(map(res => res['results']));

    obj.subscribe(value => (this.students = value));
  }

  getFamilies() {
    this.setHeaders();
    return this._userService.getFamilies(this.httpOptions);
  }

  getStudent(id: string = '') {
    this.setHeaders();
    let url = '/api/v1/applyonline/students/';
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
          first_name: res['first_name'],
          preferred_name: res['preferred_name'],
          last_name: res['last_name'],
          middle_name: res['middle_name'],
          gender: res['gender'],
          dob: res['dob']
        }))
      );
  }
}
