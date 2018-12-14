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
import { FamilyService } from '@app/applications/family/family.service';

@Component({
  selector: 'aofront-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css'],
  styles: [
    `
      ::ng-deep formly-field {
        display: block !important;
      }
      .hidden {
        display: none !important;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyComponent implements OnInit {
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
      name: '',
      connections: false,
      connections_more: '',
      address_search: '',
      address: {},
      home_phone: ''
    },
    parents: [{}]
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'basic_info',
      wrappers: ['panel'],
      fieldGroupClassName: 'row',
      templateOptions: { label: 'Basic Information' },
      fieldGroup: [
        {
          key: 'name',
          className: 'col-sm-11',
          type: 'input',
          templateOptions: {
            required: true,
            label: 'Family Name',
            type: 'text'
          },
          defaultValue: 'My Family'
        },
        {
          key: 'connections',
          type: 'checkbox',
          className: 'col-sm-11',
          templateOptions: {
            required: false,
            label: 'Connections to SGES?',
            type: 'checkbox'
          },
          defaultValue: false
        },
        {
          key: 'connections_more',
          className: 'col-sm-11',
          hideExpression: '!model.connections',
          type: 'input',
          templateOptions: {
            required: false,
            label: 'More info',
            type: 'text'
          }
        },
        {
          key: 'address_search',
          type: 'address',
          className: 'col-sm-11',
          templateOptions: {
            required: false,
            label: 'Address',
            type: 'text'
          }
        },
        {
          key: 'home_phone',
          type: 'input',
          className: 'col-sm-11',
          templateOptions: {
            required: false,
            label: 'Home Phone',
            type: 'text'
          }
        }
      ]
    },
    {
      key: 'parents',
      type: 'repeat',
      fieldArray: {
        fieldGroupClassName: 'row',
        templateOptions: {
          label: 'Adults',
          btnText: 'Add an adult'
        },
        fieldGroup: [
          {
            key: 'id',
            type: 'input',
            className: 'hidden',

            hideExpression: 'model.id',
            templateOptions: {
              type: 'text',
              hidden: true
            }
          },

          {
            key: 'first_name',
            className: 'col-sm-11',
            type: 'input',
            templateOptions: {
              required: true,
              label: 'First Name',
              type: 'text'
            }
          },
          {
            key: 'preferred_name',
            className: 'col-sm-11',
            type: 'input',
            templateOptions: {
              required: false,
              label: 'Preferred Name',
              type: 'text'
            }
          },
          {
            key: 'last_name',
            className: 'col-sm-11',
            type: 'input',
            templateOptions: {
              required: true,
              label: 'Last Name',
              type: 'text'
            }
          },
          {
            key: 'dob',
            className: 'col-sm-11',
            type: 'datepicker',
            templateOptions: {
              required: false,
              label: 'Date of Birth'
            }
          },
          {
            key: 'relationship',
            className: 'col-sm-11',
            type: 'select',
            templateOptions: {
              required: false,
              label: 'Relationship',
              type: 'select',
              options: [
                {
                  label: 'Father',
                  value: 'F'
                },
                {
                  label: 'Mother',
                  value: 'M'
                },
                {
                  label: 'Step-Father',
                  value: 'SF'
                },
                {
                  label: 'Step-Mother',
                  value: 'SM'
                },
                {
                  label: 'Grandmother',
                  value: 'GM'
                },
                {
                  label: 'Grandfather',
                  value: 'GF'
                },
                {
                  label: 'Uncle',
                  value: 'U'
                },
                {
                  label: 'Aunt',
                  value: 'A'
                },
                {
                  label: 'Legal Guardian',
                  value: 'LG'
                },
                {
                  label: 'Sibling',
                  value: 'S'
                }
              ]
            },
            defaultValue: 'LG'
          },
          {
            key: 'mobile_phone',
            className: 'col-sm-11',
            type: 'input',
            templateOptions: {
              required: false,
              label: 'Mobile Phone',
              type: 'text'
            }
          },
          {
            key: 'work_phone',
            className: 'col-sm-11',
            type: 'input',
            templateOptions: {
              required: false,
              label: 'Work Phone',
              type: 'text'
            }
          },
          {
            key: 'hometown',
            className: 'col-sm-11',
            type: 'input',
            templateOptions: {
              required: false,
              max: 50,
              label: 'Hometown',
              type: 'text'
            }
          },
          {
            key: 'employer',
            className: 'col-sm-11',
            type: 'input',
            templateOptions: {
              required: false,
              max: 50,
              label: 'Employer',
              type: 'text'
            }
          },
          {
            key: 'job_title',
            className: 'col-sm-11',
            type: 'input',
            templateOptions: {
              required: false,
              max: 50,
              label: 'Job Title',
              type: 'text'
            }
          },
          {
            key: 'email',
            className: 'col-sm-11',
            type: 'input',
            templateOptions: {
              required: true,
              max: 254,
              label: 'email',
              type: 'email'
            }
          }
        ]
      }
    }
  ];

  formValueChanges$: Observable<FormGroup>;

  editFamily$: Observable<any>;

  @Input()
  public familys: any;
  @Input()
  public familys$: any;

  @Input()
  public parents: any;
  @Input()
  public parents$: any;

  constructor(
    // private fb: FormBuilder,
    private store: Store<State>,
    private translate: TranslateService,
    private notificationService: NotificationService,
    public familyService: FamilyService,
    private ref: ChangeDetectorRef
  ) {}

  submit(model) {
    console.log(model);
    this.notificationService.info(model.first_name);
  }

  loadFamily(id = '') {
    if (id) {
      const aFamily = this.familyService.getFamily(id);

      aFamily.subscribe(value => {
        this.model = value;

        this.editing = true;

        this.ref.markForCheck();
      });
    } else {
      for (const v in this.model) this.model[v] = '';
    }
    this.editing = false;
    this.ref.markForCheck();
  }

  createOrUpdateFamily() {
    console.log(this.model);

    this.familyService.createOrUpdateFamily(this.model).subscribe(
      data => {
        console.log(data);
        this.model.id = data['id'];
        this.editing = true;
        this.notificationService.info('Family information updated');
        this.familys$ = this.familyService.getFamilys();
        this.familys = this.familys$.subscribe(value => {
          this.familys = value;
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

    this.parents$ = this.familyService.getParents();
    this.parents = this.parents$.subscribe(value => (this.parents = value));

    this.familys$ = this.familyService.getFamilys();
    this.familys = this.familys$.subscribe(value => (this.familys = value));
    this.familyService.getFamilies().subscribe(val => {
      // this.model['families'] = val['results'];
      // console.log(this.model);
      this.familyService.getFamily(val['results'][0].id).subscribe(valu => {
        this.model = valu;
      });
      this.editing = true;
    });

    /*this.familyService.getData().subscribe(([model, fields]) => {
      this.fields = fields;
      this.model = model;
      console.log(this.fields);
      console.log(this.model);
    });*/
  }
}
