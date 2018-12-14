// panel-wrapper.component.ts
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'formly-wrapper-panel',
  template: `
 <mat-card [ngClass]="routeAnimationsElements">
      <mat-card-title>{{ field.templateOptions.label }}</mat-card-title>
      <mat-card-content>
        <ng-container #fieldComponent></ng-container>
      </mat-card-content>
 </mat-card>
    
   `
})
export class PanelWrapperComponent extends FieldWrapper {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent: ViewContainerRef;
}
