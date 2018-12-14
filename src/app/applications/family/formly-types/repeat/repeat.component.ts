import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <mat-card>
      <mat-card-title>{{ field.fieldArray.templateOptions.label }}</mat-card-title>
      <mat-card-content *ngFor="let field of field.fieldGroup; let i = index;"  [ngClass]="routeAnimationsElements">
    
      <formly-group
        [field]="field"
        [options]="options"
        [form]="formControl">
        <div class="col-sm-1 d-flex align-items-center">
          <button mat-raised-button color="warn" type="button" (click)="remove(i)"><fa-icon icon="trash"></fa-icon></button>
        </div>
      </formly-group>
    
      </mat-card-content>
      
      <mat-card-actions>
      <button mat-raised-button color="accent" type="button" (click)="add()"><fa-icon icon="plus"></fa-icon> {{ field.fieldArray.templateOptions.btnText }}</button>
      </mat-card-actions>
      </mat-card>
    
  `
})
export class RepeatComponent extends FieldArrayType {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(builder: FormlyFormBuilder) {
    super(builder);
  }
}
