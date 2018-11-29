import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'aofront-newstudent',
  templateUrl: './newstudent.component.html',
  styleUrls: ['./newstudent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewstudentComponent implements OnInit {
  form = new FormGroup({});
  model = {
    first_name: 'First',
    preferred_name: 'Preferred',
    middle_name: 'Middle',
    last_name: 'Last'
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'first_name',
      type: 'input',
      templateOptions: {
        // type: 'email',
        label: 'First name',
        placeholder: 'Enter first name',
        required: true
      }
    },
    {
      key: 'preferred_name',
      type: 'input',
      templateOptions: {
        // type: 'email',
        label: 'Preferred name',
        placeholder: 'Enter first name',
        required: true
      }
    },
    {
      key: 'middle_name',
      type: 'input',
      templateOptions: {
        // type: 'email',
        label: 'Middle name',
        placeholder: 'Enter middle name',
        required: true
      }
    },
    {
      key: 'last_name',
      type: 'input',
      templateOptions: {
        // type: 'email',
        label: 'Preferred name',
        placeholder: 'Enter first name',
        required: true
      }
    }
  ];

  submit(model) {
    console.log(model);
  }

  constructor() {}

  ngOnInit() {}
}
