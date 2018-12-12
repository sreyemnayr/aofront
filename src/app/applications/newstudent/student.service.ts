import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      headers: new HttpHeaders()
    };
    this.httpOptions.headers.set(
      'Authorization',
      'JWT ' + this._userService.token
    );
  }

  getData(): Observable<any> {
    console.log(forkJoin([this.getModel(), this.getFields()]));
    return forkJoin([this.getModel(), this.getFields()]);
  }

  getModel() {
    this.setHeaders();
    return this.http.get<{ any }>('/api/v1/applyonline/students/', {
      headers: { Authorization: 'JWT ' + this._userService.token }
    });
  }

  getFields() {
    this.setHeaders();
    return this.http.options<FormlyFieldConfig[]>('/api/v1/students/', {
      headers: { Authorization: 'JWT ' + this._userService.token }
    });
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
