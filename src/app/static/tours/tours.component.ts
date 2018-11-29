import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { Feature, tours } from './tours.data';

@Component({
  selector: 'aofront-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToursComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  tours: Feature[] = tours;

  ngOnInit() {}

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
