import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowComponent } from './flow/flow.component';

import { AgGridModule } from 'ag-grid-angular';
import { AdminComponent } from './admin/admin.component';

import { AdminRoutingModule } from '@app/admin/admin-routing.module';

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

import { AppflowService } from '@app/admin/appflow.service';

import { ApplicationsEffects } from '../applications/applications.effects';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { FEATURE_NAME, reducers } from '@app/applications/applications.state';
import { GenderEditorComponent } from './flow/gender-editor/gender-editor.component';
import { CustomHeaderComponent } from './flow/custom-header/custom-header.component';

export class AnimationWrapper {
  run(fc) {
    fc.templateManipulators.preWrapper.push(field => 'animation');
  }
}

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    AdminRoutingModule,
    AgGridModule.withComponents([GenderEditorComponent, CustomHeaderComponent]),
    StoreModule.forFeature(FEATURE_NAME, reducers),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    EffectsModule.forFeature([ApplicationsEffects]),

    // FormlyBootstrapModule,
    FormlyMaterialModule,
    FormlyMatToggleModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
    GooglePlaceModule
  ],
  declarations: [
    AdminComponent,
    FlowComponent,
    GenderEditorComponent,
    CustomHeaderComponent
  ],
  providers: [AppflowService]
})
export class AdminModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/applications/`,
    '.json'
  );
}
