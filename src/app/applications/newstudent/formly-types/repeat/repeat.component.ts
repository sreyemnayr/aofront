import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <mat-card>
      <mat-card-title>{{ field.fieldArray.templateOptions.label }}</mat-card-title>
      <mat-card-content *ngFor="let field of field.fieldGroup; let i = index;">
    
      <formly-group
        [field]="field"
        [options]="options"
        [form]="formControl">
        <div class="col-sm-2 d-flex align-items-center">
          <button mat-raised-button color="warn" type="button" (click)="remove(i)">Remove</button>
        </div>
      </formly-group>
    
      </mat-card-content>
      <mat-card-actions>
      <button mat-raised-button color="accent" type="button" (click)="add()">{{ field.fieldArray.templateOptions.btnText }}</button>
      </mat-card-actions>
      </mat-card>
    <mat-divider></mat-divider>
  `
})
export class RepeatComponent extends FieldArrayType {
  constructor(builder: FormlyFormBuilder) {
    super(builder);
  }
}
