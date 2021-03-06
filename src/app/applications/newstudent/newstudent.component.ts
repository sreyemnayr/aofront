import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '@app/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { select, Store } from '@ngrx/store';
import { State } from '@app/applications/applications.state';
import { debounceTime, filter, take } from 'rxjs/operators';
// import { Form } from '@app/applications/form/form.model';
import { selectFormState } from '@app/applications/form/form.selectors';
import { Observable } from 'rxjs';
import { StudentService } from '@app/applications/newstudent/student.service';

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

  @Input()
  editing = false;

  @Input()
  families = [];

  @Input()
  model = {
    id: '',
    basic_info: {
      first_name: '',
      preferred_name: '',
      middle_name: '',
      last_name: '',
      dob: '',
      gender: ''
    },
    schools_attended: []
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
            className: 'col-sm-4',
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

  formValueChanges$: Observable<FormGroup>;

  editStudent$: Observable<any>;

  @Input()
  public students: any;
  @Input()
  public students$: any;

  constructor(
    // private fb: FormBuilder,
    private store: Store<State>,
    private translate: TranslateService,
    private notificationService: NotificationService,
    public studentService: StudentService,
    private ref: ChangeDetectorRef
  ) {}

  submit(model) {
    console.log(model);
    this.notificationService.info(model.first_name);
  }

  loadStudent(id = '') {
    if (id) {
      const aStudent = this.studentService.getStudent(id);

      aStudent.subscribe(value => {
        // this.form.get('first_name').setValue(value.first_name);
        // this.form.get('last_name').setValue(value.last_name);
        // this.form.get('id').setValue(value.first_name);
        this.model = {
          ...this.model,
          id: value.id,
          basic_info: {
            ...this.model.basic_info,
            first_name: value.first_name,
            last_name: value.last_name,
            preferred_name: value.preferred_name,
            middle_name: value.middle_name,
            gender: value.gender,
            dob: value.dob
          }
        };
        this.editing = true;

        this.ref.markForCheck();
      });
    } else {
      this.model = {
        ...this.model,
        id: '',
        basic_info: {
          ...this.model.basic_info,
          first_name: '',
          last_name: '',
          preferred_name: '',
          middle_name: '',
          gender: '',
          dob: ''
        }
      };
      this.editing = false;
      this.ref.markForCheck();
    }
  }

  createOrUpdateStudent() {
    this.studentService.createOrUpdateStudent(this.model).subscribe(
      data => {
        console.log(data);
        this.model.id = data['id'];
        this.editing = true;
        this.notificationService.info('Student information updated');
        this.students$ = this.studentService.getStudents();
        this.students = this.students$.subscribe(value => {
          this.students = value;
          this.ref.markForCheck();
        });
      },
      err => {
        let message = '';

        for (const k in err['error']) {
          if (k) {
            for (const v of err['error'][k]) {
              message += k + ': ' + v + ' \n ';
            }
          }
        }

        this.notificationService.error(message);
      }
    );
  }

  ngOnInit() {
    this.formValueChanges$ = this.form.valueChanges.pipe(debounceTime(500));
    this.store
      .pipe(
        select(selectFormState),
        take(1)
      )
      .subscribe(form => this.form.patchValue(form.form));

    this.students$ = this.studentService.getStudents();
    this.students = this.students$.subscribe(value => (this.students = value));
    this.studentService.getFamilies().subscribe(val => {
      this.model['families'] = val['results'];
      console.log(this.model);
    });

    /*this.studentService.getData().subscribe(([model, fields]) => {
      this.fields = fields;
      this.model = model;
      console.log(this.fields);
      console.log(this.model);
    });*/
  }
}
