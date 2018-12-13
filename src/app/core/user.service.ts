import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  routeAnimations,
  AppState,
  LocalStorageService,
  selectIsAuthenticated,
  NotificationService
} from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export const TOKEN_KEY = 'TOKEN';

@Injectable()
export class UserService implements OnInit {
  isAuthenticated$: Observable<boolean>;

  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private storageService: LocalStorageService,
    private notificationService: NotificationService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.token = this.storageService.getItem(TOKEN_KEY);
    if (this.token) {
      this.refreshToken();
    }
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    this.http
      .post('/rest-auth/login/', JSON.stringify(user), this.httpOptions)
      .subscribe(
        data => {
          this.updateData(data['token']);
          this.store.dispatch(new ActionAuthLogin());
          this.notificationService.info('Logged in');
        },
        err => {
          this.errors = err['error'];
        }
      );
  }

  public signup(user) {
    this.http
      .post('/rest-auth/registration/', JSON.stringify(user), this.httpOptions)
      .subscribe(
        data => {
          this.updateData(data['token']);
          this.store.dispatch(new ActionAuthLogin());
          this.notificationService.info('Logged in');
        },
        err => {
          let message = '';

          for (const k in err['error']) {
            if (k) {
              for (const v of err['error'][k]) {
                message += k + ': ' + v + ' \n ';
              }
            }
          }

          this.notificationService.error(message);
        }
      );
    console.log(this);
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http
      .post(
        '/api-token-refresh/',
        JSON.stringify({ token: this.token }),
        this.httpOptions
      )
      .subscribe(
        data => {
          this.updateData(data['token']);
        },
        err => {
          this.errors = err['error'];
        }
      );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
    this.storageService.setItem(TOKEN_KEY, null);
    this.store.dispatch(new ActionAuthLogout());
    this.notificationService.info('Logged out');
  }

  private updateData(token) {
    this.token = token;
    this.storageService.setItem(TOKEN_KEY, token);
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

  public getFamilies(httpOptions) {
    const url = '/api/v1/applyonline/families/';
    return this.http.get(url, httpOptions);
  }

  ngOnInit(): void {
    if (this.token !== '') {
      this.refreshToken();
    }
  }
}
