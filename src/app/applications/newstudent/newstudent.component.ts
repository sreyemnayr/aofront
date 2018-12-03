import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '@app/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { select, Store } from '@ngrx/store';
import { State } from '@app/applications/applications.state';
import { debounceTime, filter, take } from 'rxjs/operators';
import { Form } from '@app/applications/form/form.model';
import { selectFormState } from '@app/applications/form/form.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'aofront-newstudent',
  templateUrl: './newstudent.component.html',
  styleUrls: ['./newstudent.component.css'],
  styles: [
    `
      ::ng-deep formly-field {
        display: block !important;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewstudentComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model = {
    basic_info: {
      first_name: '',
      preferred_name: '',
      middle_name: '',
      last_name: '',
      dob: ''
    },
    schools_attended: [{}]
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'basic_info',
      wrappers: ['panel'],
      templateOptions: { label: 'Basic Information' },
      fieldGroup: [
        {
          key: 'first_name',
          type: 'input',
          templateOptions: {
            // type: 'email',
            label: 'First name',
            blur: () => {
              const control = this.form.get('basic_info.preferred_name');
              if (!this.model.basic_info.preferred_name) {
                control.setValue(this.model.basic_info.first_name);
              }
            },

            required: true
          }
        },
        {
          key: 'preferred_name',
          type: 'input',
          templateOptions: {
            // type: 'email',
            label: 'Preferred name',

            required: true
          }
        },
        {
          key: 'middle_name',
          type: 'input',
          templateOptions: {
            // type: 'email',
            label: 'Middle name',

            required: false
          }
        },
        {
          key: 'last_name',
          type: 'input',
          templateOptions: {
            // type: 'email',
            label: 'Last name',

            required: true
          }
        },

        {
          type: 'select',
          key: 'gender',
          templateOptions: {
            label: 'Gender',
            required: true,
            options: [
              { value: `M`, label: `Male` },
              { value: `F`, label: `Female` },
              { value: `X`, label: `Prefer to not answer` }
            ]
          }
        },
        {
          key: 'dob',
          type: 'datepicker',
          templateOptions: {
            label: 'Date of Birth',

            description:
              'If your child is not born yet, please indicate the projected due date.',
            required: true
          }
        }
      ]
    },
    {
      key: 'schools_attended',
      type: 'repeat',
      fieldArray: {
        fieldGroupClassName: 'row',
        templateOptions: {
          label: 'Schools attended',
          btnText: 'Add a school'
        },
        fieldGroup: [
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'name',
            templateOptions: {
              label: 'Name of School:',
              required: true
            }
          },
          {
            type: 'datepicker',
            key: 'start_date',
            className: 'col-sm-3',
            templateOptions: {
              label: 'Start Date'
            }
          },
          {
            type: 'toggle',
            key: 'current',
            className: 'col-sm-3',
            templateOptions: {
              label: 'Current school?'
            }
          },
          {
            type: 'datepicker',
            key: 'end_date',
            hideExpression: 'model.current',
            className: 'col-sm-3',
            templateOptions: {
              label: 'End Date'
            }
          }
        ]
      }
    },
    {
      key: 'evaluations',
      type: 'repeat',
      fieldArray: {
        fieldGroupClassName: 'row',
        templateOptions: {
          label: 'Evaluations and Accomplishments',
          btnText: '+'
        },
        fieldGroup: [
          {
            className: 'col-sm-3',
            type: 'select',
            key: 'type',
            templateOptions: {
              label: 'Category',
              required: true,
              options: [
                { value: `A`, label: `Accomplishment` },
                { value: `R`, label: `Repeated Grade` },
                { value: `P`, label: `Psychological Evaluation` },
                { value: `E`, label: `Educational Evaluation` },
                { value: `S`, label: `Speech/Language Evaluation` },
                { value: `O`, label: `Occupational Therapy` },
                { value: `C`, label: `Professional Counseling` },
                { value: `X`, label: `Other` }
              ]
            }
          },
          {
            type: 'datepicker',
            key: 'date',
            className: 'col-sm-3',
            templateOptions: {
              label: 'Date'
            }
          },
          {
            type: 'input',
            key: 'description',
            className: 'col-sm-4',
            templateOptions: {
              label: 'Details'
            }
          }
        ]
      }
    }
  ];

  formValueChanges$: Observable<Form>;

  constructor(
    // private fb: FormBuilder,
    private store: Store<State>,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {}

  submit(model) {
    console.log(model);
    this.notificationService.info(model.first_name);
  }

  ngOnInit() {
    this.formValueChanges$ = this.form.valueChanges.pipe(debounceTime(500));
    this.store
      .pipe(
        select(selectFormState),
        take(1)
      )
      .subscribe(form => this.form.patchValue(form.form));
  }
}
