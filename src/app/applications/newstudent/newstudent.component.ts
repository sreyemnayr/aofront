import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '@app/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewstudentComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  form = new FormGroup({});
  model = {
    first_name: '',
    preferred_name: '',
    middle_name: '',
    last_name: ''
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'autosave',
      type: 'toggle',
      templateOptions: {
        label: 'Autosave',
        description: 'Autosave progress?',
        required: false
      }
    },
    {
      key: 'first_name',
      type: 'input',
      templateOptions: {
        // type: 'email',
        label: 'First name',

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

        required: true
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
    this.formValueChanges$ = this.form.valueChanges.pipe(
      debounceTime(500),
      filter((form: Form) => form.autosave)
    );
    this.store
      .pipe(
        select(selectFormState),
        take(1)
      )
      .subscribe(form => this.form.patchValue(form.form));
  }
}
