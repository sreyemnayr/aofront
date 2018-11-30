// panel-wrapper.component.ts
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-panel',
  template: `
 <mat-card>
      <mat-card-title>{{ field.templateOptions.label }}</mat-card-title>
      <mat-card-content>
        <ng-container #fieldComponent></ng-container>
      </mat-card-content>
 </mat-card>
    <mat-divider></mat-divider>
   `
})
export class PanelWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent: ViewContainerRef;
}
