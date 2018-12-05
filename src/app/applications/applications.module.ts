import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@app/shared';
import { environment } from '@env/environment';

import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
// import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';

// for material2 import `FormlyMaterialModule`:
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FEATURE_NAME, reducers } from './applications.state';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications/applications.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { TodosEffects } from './todos/todos.effects';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { CrudComponent } from './crud/components/crud.component';
import { BooksEffects } from './crud/books.effects';
import { FormComponent } from './form/components/form.component';
import { FormEffects } from './form/form.effects';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { NewstudentComponent } from './newstudent/newstudent.component';

import { ApplicationsEffects } from './applications.effects';
import { PanelWrapperComponent } from './newstudent/panel-wrapper/panel-wrapper.component';
import { InputComponent } from './newstudent/formly-types/input/input.component';
import { RepeatComponent } from './newstudent/formly-types/repeat/repeat.component';
import { AnimationWrapperComponent } from './newstudent/animation-wrapper/animation-wrapper.component';
import { StudentService } from './newstudent/student.service';

export class AnimationWrapper {
  run(fc) {
    fc.templateManipulators.preWrapper.push(field => 'animation');
  }
}

@NgModule({
  imports: [
    SharedModule,
    ApplicationsRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    EffectsModule.forFeature([
      ApplicationsEffects,
      TodosEffects,
      StockMarketEffects,
      BooksEffects,
      FormEffects
    ]),
    FormlyModule.forRoot({
      types: [
        { name: 'input', component: InputComponent },
        { name: 'repeat', component: RepeatComponent }
      ],
      wrappers: [
        { name: 'panel', component: PanelWrapperComponent },
        { name: 'animation', component: AnimationWrapperComponent }
      ],
      manipulators: [{ class: AnimationWrapper, method: 'run' }],
      validationMessages: [
        { name: 'required', message: 'This field is required' }
      ]
    }),
    // FormlyBootstrapModule,
    FormlyMaterialModule,
    FormlyMatToggleModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule
  ],
  declarations: [
    ApplicationsComponent,
    TodosContainerComponent,
    StockMarketContainerComponent,
    ParentComponent,
    ChildComponent,
    AuthenticatedComponent,
    CrudComponent,
    FormComponent,
    NotificationsComponent,
    NewstudentComponent,
    PanelWrapperComponent,
    InputComponent,
    RepeatComponent,
    AnimationWrapperComponent
  ],
  providers: [StockMarketService, StudentService]
})
export class ApplicationsModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/applications/`,
    '.json'
  );
}
