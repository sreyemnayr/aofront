import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map } from 'rxjs/operators';
import { UserService } from '@app/core/user.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnInit {
  public token = '';
  private httpOptions: any;

  constructor(private http: HttpClient, private _userService: UserService) {}

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
    return this.http.get<{ any }>('/api/v1/students/', {
      headers: { Authorization: 'JWT ' + this._userService.token }
    });
  }

  getFields() {
    this.setHeaders();
    return this.http.options<FormlyFieldConfig[]>('/api/v1/students/', {
      headers: { Authorization: 'JWT ' + this._userService.token }
    });
  }
}
