/** dependencies */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

/** wrappers */
import { PanelWrapperComponent } from './wrappers/panel-wrapper.component';
import { ErrorWrapperComponent } from './wrappers/error.component';

/** types */
import { RepeatSectionComponent } from './types/repeat-section.component';
import { FormlyFieldInputMoney } from './types/money.component';
import { FormlyFieldInputPercentage } from './types/percentage.component';

/** configuration */
import { config } from './config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(config),
    FormlyBootstrapModule,
    TextMaskModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ],
  declarations: [
    PanelWrapperComponent,
    ErrorWrapperComponent,
    RepeatSectionComponent,
    FormlyFieldInputMoney,
    FormlyFieldInputPercentage
  ]
})
export class UiFormModule {}
