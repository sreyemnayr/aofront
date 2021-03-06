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
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(
      select(selectAuth),
      map(auth => auth.isAuthenticated)
    );
  }
}
