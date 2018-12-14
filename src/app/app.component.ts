import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from '@app/core/user.service';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  routeAnimations,
  AppState,
  LocalStorageService,
  selectIsAuthenticated
} from '@app/core';
import { environment as env } from '@env/environment';

import {
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAnimationsPageDisabled,
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from './settings';

@Component({
  selector: 'aofront-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo-inverted.png');
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br'];
  navigation = [
    { link: 'about', label: 'aofront.menu.about' },
    { link: 'tours', label: 'aofront.menu.tours' },
    { link: 'applications', label: 'aofront.menu.applications' },
    { link: 'admin', label: 'Admin' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'aofront.menu.settings' }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  public user: any;

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService,
    public _userService: UserService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: ''
    };

    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }

  login() {
    this._userService.login({
      username: this.user.username,
      password: this.user.password
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

  stopPropagation(event) {
    event.stopPropagation();
    // console.log("Clicked!");
  }
}
