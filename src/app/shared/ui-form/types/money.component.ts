import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'formly-field-input-money',
  template: `
   <div class="form-group">
     <input type="text" class="form-control" [textMask]="{mask: numberMask}" [formControl]="formControl" [formlyAttributes]="field">
   </div>
 `
})
export class FormlyFieldInputMoney extends FieldType {
  public numberMask = createNumberMask({
    prefix: '$ ',
    allowDecimal: true
  });
}
