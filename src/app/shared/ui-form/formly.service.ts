import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Field } from './helpers/fields';
import { DEFAULT_FORM } from './schemas/default.form';
import { FORMS_VALUES } from './schemas';

@Injectable()
export class FormlyService {
  public getDefaultForm(): FormlyFieldConfig[] {
    return DEFAULT_FORM().template;
  }

  public getFormById(id: string, disabled = false) {
    return FORMS_VALUES(disabled)[id];
  }

  private generateCleanConfiguration(clone: object[]) {
    return JSON.parse(JSON.stringify(clone));
  }

  /*public getFormlyFieldConfig(): FormlyFieldConfig[] {
    return [
      Field.input('name', {
        label: 'Name',
        placeholder: 'Enter your name',
        required: true
      }),
      Field.input('email', {
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true
      }),
      Field.select('country', {
        label: 'Country',
        placeholder: 'Select your country',
        options: [
          { label: 'United States of America', value: 'USA' },
          { label: 'Colombia', value: 'COL' },
          { label: 'India', value: 'IND' }
        ],
        required: true,
      }, {
        defaultValue: '',
      }),
      Field.textarea('message',  {
        label: 'Message',
        placeholder: 'Enter a message',
        rows: 5,
        required: true
      }),
    ]
  }*/
}
