import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '@app/core/user.service';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  routeAnimations,
  AppState,
  LocalStorageService,
  selectIsAuthenticated
} from '@app/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'aofront-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [routeAnimations]
})
export class AboutComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  public user: any;
  public newuser: any;
  constructor(
    public _userService: UserService,
    private store: Store<AppState>
  ) {}
  isAuthenticated$: Observable<boolean>;

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
    this.newuser = {
      username: '',
      password1: '',
      password2: '',
      email: ''
    };

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
  login() {
    this._userService.login({
      username: this.user.username,
      password: this.user.password
    });
    // this.store.dispatch(new ActionAuthLogin());
  }

  signup() {
    this._userService.signup({
      username: this.newuser.username,
      password1: this.newuser.password1,
      password2: this.newuser.password2,
      email: this.newuser.email
    });
    // this.store.dispatch(new ActionAuthLogin());
  }

  refreshToken() {
    this._userService.refreshToken();
  }

  logout() {
    this._userService.logout();
    // this.store.dispatch(new ActionAuthLogout());
  }

  public trackByFunction(index, item) {
    if (!item) return null;
    return index;
  }
}
