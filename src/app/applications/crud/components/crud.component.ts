import { v4 as uuid } from 'uuid';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { State } from '../../applications.state';
// import { Book } from '../books.model';
import { ActionBooksUpsertOne, ActionBooksDeleteOne } from '../books.actions';
import { selectSelectedBook, selectAllBooks } from '../books.selectors';
import {
  FormlyFieldConfig,
  FormlyForm,
  FormlyFormOptions,
  FieldArrayType,
  FormlyFormBuilder
} from '@ngx-formly/core';

import { EntityState } from '@ngrx/entity';

export interface Student {
  id: string;
  basic_info: {
    first_name: string;
    preferred_name: string;
    middle_name: string;
    last_name: string;
    dob: string;
  };
  schools_attended: [
    {
      name: string;
      start_date: string;
      end_date: string;
      current: boolean;
    }
  ];
  evaluations: [
    {
      type: string;
      date: string;
      description: string;
    }
  ];
}

export interface StudentState extends EntityState<Student> {}

@Component({
  selector: 'aofront-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudComponent {
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
    schools_attended: [{}],
    evaluations: [{}]
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

  formValueChanges$: Observable<FormGroup>;

  bookFormGroup = this.form;

  books$: Observable<Student[]> = this.store.pipe(select(selectAllBooks));
  selectedBook$: Observable<Student> = this.store.pipe(
    select(selectSelectedBook)
  );

  isEditing: boolean;

  static createBook(): Student {
    return {
      id: uuid(),
      basic_info: {
        first_name: '',
        preferred_name: '',
        middle_name: '',
        last_name: '',
        dob: ''
      },
      schools_attended: [
        {
          name: '',
          start_date: '',
          end_date: '',
          current: false
        }
      ],
      evaluations: [
        {
          type: '',
          date: '',
          description: ''
        }
      ]
    };
  }

  constructor(
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router
  ) {}

  select(book: Student) {
    this.isEditing = false;
    this.router.navigate(['applications/crud', book.id]);
  }

  deselect() {
    this.isEditing = false;
    this.router.navigate(['applications/crud']);
  }

  edit(book: Student) {
    this.isEditing = true;
    this.bookFormGroup.setValue(book);
  }

  addNew(bookForm: FormlyForm) {
    // bookForm.options.resetModel();
    this.bookFormGroup.reset();
    this.bookFormGroup.setValue(CrudComponent.createBook());
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  delete(book: Student) {
    this.store.dispatch(new ActionBooksDeleteOne({ id: book.id }));
    this.isEditing = false;
    this.router.navigate(['applications/crud']);
  }

  save() {
    if (this.bookFormGroup.valid) {
      const book = this.bookFormGroup.value;
      this.store.dispatch(new ActionBooksUpsertOne({ book }));
      this.isEditing = false;
      this.router.navigate(['applications/crud', book.id]);
    }
  }
}
