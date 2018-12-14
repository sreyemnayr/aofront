import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { routeAnimations, selectAuth } from '@app/core';
import { State as BaseSettingsState } from '@app/settings';

import { State as BaseapplicationsState } from '../applications.state';

interface State extends BaseSettingsState, BaseapplicationsState {}

@Component({
  selector: 'aofront-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationsComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  applications = [
    {
      link: 'students',
      label: 'Students',
      auth: true
    },
    {
      link: 'families',
      label: 'My Family',
      auth: true
    }
    // { link: 'todos', label: 'aofront.applications.menu.todos' },
    // { link: 'stock-market', label: 'aofront.applications.menu.stocks' },
    // { link: 'theming', label: 'aofront.applications.menu.theming' },
    // { link: 'crud', label: 'aofront.applications.menu.crud' },
    // { link: 'form', label: 'aofront.applications.menu.form' },
    // { link: 'notifications', label: 'aofront.applications.menu.notifications' },
    // {
    //   link: 'authenticated',
    //   label: 'aofront.applications.menu.auth',
    //   auth: true
    // }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(
      select(selectAuth),
      map(auth => auth.isAuthenticated)
    );
  }
}
