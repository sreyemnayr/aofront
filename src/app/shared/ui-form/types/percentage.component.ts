import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input-percentage',
  template: `
   <div class="form-group">
     <label class="form-control-label control-label">
       {{ to.label }}
     </label>
     <input type="text" class="form-control" [textMask]="{mask: limitToHundred}" [formControl]="formControl" [formlyAttributes]="field">
   </div>
 `
})
export class FormlyFieldInputPercentage extends FieldType {
  public limitToHundred(rawValue) {
    const value = parseInt(rawValue, 10);

    if (value < 100) {
      if (value < 10) {
        return [/\d/, ' %'];
      } else return [/\d/, /\d/, ' %'];
    } else {
      return ['100 %'];
    }
  }
}
